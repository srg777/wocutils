woc-common

Общая утилитная библиотека для всех сервисов проекта WOC (джины, BFF, оркестраторы).
Содержит инструменты логирования, валидации, работы с токенами, базой данных, Web3 и т.д.

⸻

📦 Установка

npm install git+ssh://git@github.com:woc-project/wocutils.git

package.json:
"dependencies": {
	git+ssh://git@github.com:srg777/wocutils.git
}


⸻

🧱 Экспортируемые модули

const {
  logger,
  alert,
  result,
  validate,
  checker,
  jwtToken,
  cookieToken,
  web3messages
} = require('@woc/common');



⸻

🛠 Модули

logger

Winston логгер с TelegramTransport.

logger.info('Hello');
logger.error('Something went wrong');

alert

Уведомления в Telegram.

await alert.sendToTelegram('🔥 Genie failed');

result

Функции для унифицированной передачи результата:

const { Ok, Err } = result;
return Ok(data);
return Err('Not enough gold');

validate

Обёртка над Zod-схемами.

const validated = validate.validate(mySchema, req.body);

checker

Проверки UUID, Ethereum-адреса, JSON и др.

checker.isUUID(missionId);
checker.isEthAddress(wallet);
checker.isValidJson(payload);

jwtToken

Работа с JWT:

const token = jwtToken.generateToken(userId);
const user = jwtToken.validateToken(token);

cookieToken

Утилиты для установки/удаления JWT в куках (для браузеров).

cookieToken.setJwtInCookie(res, token);
cookieToken.clearJwtFromCookie(res);

web3messages

Работа с сообщениями и подписями Web3.

const message = web3messages.getLoginMessage(address);
const isValid = web3messages.verifyLoginSignature(address, message, signature);

⸻

📁 Структура

woc-common/
├── alert.js
├── checker.js
├── cookieToken.js
├── jwtToken.js
├── logger.js
├── result.js
├── validate.js
├── web3messages.js
└── index.js



⸻

📌 Требования
	•	Node.js >= 18
	•	.env должен содержать:
	•	TELEGRAM_BOT_TOKEN
	•	TELEGRAM_CHAT_ID

⸻

🧪 TODO / Roadmap
	•	Добавить тесты (jest)
	•	Добавить utils.js (sleep, retry, traceId и др.)
	•	Автоматическая документация (через JSDoc или typedoc)

⸻

🤝 Contributing

Pull requests welcome! Используйте eslint и единый стиль кода.

⸻

© WOC Project



