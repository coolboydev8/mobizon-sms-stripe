const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Replace with your Mobizon API key
const API_KEY = process.env.SMS_KEY;

// Mobizon API URL for sending SMS
const MOBIZON_API_SendMessage = 'https://api.mobizon.gmbh/service/message/sendSmsMessage';
const MOBIZON_Create_ShortLink = 'https://api.mobizon.gmbh/service/Link/create';

// Function to send SMS
async function sendSMS(recipient, message) {
    try {
////short link
        const params = {
            apiKey: API_KEY,
            data: {
              fullLink: message,
              status: 1,
              expirationDate: '',
              comment: 'Shortened link.',
            }
        }
        console.log(params);

        const shortenResponse = await axios.post(MOBIZON_Create_ShortLink, null, { params });
      
        if (shortenResponse.data.code !== 0) {
        throw new Error(`Error shortening URL: ${shortenResponse.data.message}`);
        }
    
        const shortUrl = shortenResponse.data.data. shortLink;
        const sendMsg = `Here is your link: ${shortUrl}`;
        console.log(sendMsg);


//        Make a POST request to the Mobizon API
        const response = await axios.post(MOBIZON_API_SendMessage, null, {
            params: {
                apiKey: API_KEY,
                recipient: recipient,
                text: sendMsg
            }
        });

        if (response.data.code === 0) {
            console.log('SMS sent successfully!');
          } else {
            console.error(`Error sending SMS: ${smsResponse.data.message}`);
        }
    } catch (error) {
        console.error(`HTTP Error: ${error.message}`);
    }
}

module.exports = {sendSMS};
