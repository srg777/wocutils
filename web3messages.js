const {Web3} = require('web3');
const web3 = new Web3();

function verify(message, signature) {
  const recoveredAddress = web3.eth.accounts.recover(message, signature);
  return recoveredAddress;
}

function sign(message, privateKey) {
  const signature = web3.eth.accounts.sign(message, privateKey);
  return signature.signature;
}

module.exports = {sign, verify};