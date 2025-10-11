const axios = require('axios');
const result = require('./result');

async function httpPostRetry(url, payload, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const response = await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json' }});
            if (response.status !== 200) {
                throw new Error(`${response.statusText}`);
            }

            return result.Ok(response.data);
        } catch (error) {
            if (attempt === maxAttempts) {
                    return result.Err(error.message);
            }
            const delay = 1000 + 5000*(attempt-1);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function httpGetRetry(url, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const response = await axios.get(url);
            if (response.status !== 200) {
                throw new Error(`${response.statusText}`);
            }

            return result.Ok(response.data);
        } catch (error) {
            if (attempt === maxAttempts) {
                    return result.Err(error.message);
            }
            const delay = 1000 + 5000*(attempt-1);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}


module.exports = {
    httpGetRetry,
    httpPostRetry,
};