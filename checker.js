function isValidJson(data) {
    if (typeof data !== 'string') return false;
    try {
      JSON.parse(data);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  function isUUID(str) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  }
  
  function isEthAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address);
  }
  
  module.exports = {
    isValidJson,
    isUUID,
    isEthAddress
  };