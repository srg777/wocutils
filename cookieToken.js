const {Cookies} = require('js-cookie')
const debug = true;

const base64UrlDecode = (str) => {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    const base64WithPadding = base64 + padding;
    const decoded = atob(base64WithPadding);
  
    return decoded;
  };
  
  const parseJwt = (token) => {
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      throw new Error('Invalid JWT');
    }
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
  };

  const isAccessTokenPresent = () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      return false;
    }
    return (true)
  }

  const isAccessTokenValid = () => {
    const token = Cookies.get('accessToken');
    if (!token) {
      return false;
    }
    const decoded = parseJwt(token);
    const now = Date.now() / 1000;
    return (decoded.exp > now);
  }


  const getCurrentUserDataFromToken = (token) => {
    try {
      const decoded = parseJwt(token);
      const now = Date.now() / 1000;
      if (decoded.exp > now) {
          return decoded;
      } else {
        return undefined;
      }
    }  catch (error) {
      return undefined;
    }
  }

  const getCurrentUuidFromReq = async (req) => {
    const accessToken = req?.cookies?.accessToken;
    if (!accessToken) {
      return undefined;
    }
    const decoded = await getCurrentUserDataFromToken(accessToken);
    const useruuid = decoded?.useruuid;
    return useruuid;
  }

module.exports = {getCurrentUserDataFromToken, isAccessTokenPresent, isAccessTokenValid, getCurrentUuidFromReq};