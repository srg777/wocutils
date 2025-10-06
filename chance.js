function clamp01(x){ return Math.max(0, Math.min(1, x)); }

function adjustChanceSigmoid(p, luck, s = 1) {

  p = clamp01(p); // clamp to [0, 1] 
  const logit = Math.log(p / (1 - p));
  const adjusted = logit + s * luck;  // adjsust log-odds by luck factor
  return 1 / (1 + Math.exp(-adjusted)); // convert back to probability
}

module.exports = { adjustChanceSigmoid };