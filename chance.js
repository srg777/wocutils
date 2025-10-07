function clamp01(x){ return Math.max(0, Math.min(1, x)); }

function adjustChanceSigmoid(p, luck, s = 1) {
  p = clamp01(p);
  const logit = Math.log(p / (1 - p));
  const adjusted = logit + s * luck;  // "сдвигаем" шанс
  return 1 / (1 + Math.exp(-adjusted)); // обратно в вероятность
}

module.exports = { adjustChanceSigmoid };