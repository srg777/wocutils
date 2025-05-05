//https://www.youtube.com/watch?v=YjEqmINAQpI
require('dotenv').config();

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;
const axios = require('axios');
const Transport = require('winston-transport');

class TelegramTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.token = opts.token;  // Telegram Bot Token
    this.chatId = opts.chatId; // Chat ID куда будут отправляться сообщения
    this.apiUrl = `https://api.telegram.org/bot${this.token}/sendMessage`;
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const message = this.formatMessage(info);
    
    // Отправляем сообщение в Telegram
    axios.post(this.apiUrl, {
      chat_id: this.chatId,
      text: message,
    })
    .then(response => {
      // Успешная отправка
      callback(null, response.data);
    })
    .catch(error => {
      // Ошибка отправки
      callback(error);
    });
  }

  formatMessage(info) {
    return `${info.message}\n${info.stack}`;
    // return `[${info.level.toUpperCase()}] ${info.message}`;
  }
}

// Форматирование логов
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

// Создаем общий логгер
const logger = createLogger({
  level: 'silly', // Уровень логирования
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Добавляем время к логам
    errors({ stack: true }), // Показывать стек ошибки
    logFormat
  ),
  transports: [
    new transports.Console(), // Логи в консоль
    new TelegramTransport({
      token: process.env.TELEGRAM_BOT_TOKEN, // Токен вашего бота
      chatId: process.env.TELEGRAM_CHAT_ID, // ID чата для отправки сообщений
      level: 'error'  // Только ошибки будут отправляться в Telegram
    })
    // new transports.File({ filename: 'app.log', level: 'error' }) // Логи в файл
  ]
});

module.exports = logger;