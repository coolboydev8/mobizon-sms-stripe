const axios = require('axios');
const path = require('path');

// Replace with your Mobizon API key
const API_KEY = process.env.SMS_KEY;

// Mobizon API URL for sending SMS
const MOBIZON_API_SendMessage = process.env.MOBIZON_API_SendMessage;
const MOBIZON_Create_ShortLink = process.env.MOBIZON_Create_ShortLink;

// Function to send SMS
const send_verify_sms = async(recipient, message) => {
    let shortUrl, sendMsg;
    try {
////short link
        // const params = {
        //     apiKey: API_KEY,
        //     data: {
        //         fullLink: message,
        //         status: 1,
        //         expirationDate: '',
        //         comment: 'Shortened link.',
        //     }
        // }
        
        // const shortenResponse = await axios.post(MOBIZON_Create_ShortLink, null, { params });
        
        // if (shortenResponse.data.code !== 0) {
        //     throw new Error(`Error shortening URL: ${shortenResponse.data.message}`);
        // }

        // shortUrl = shortenResponse.data.data.shortLink;
        // sendMsg = `Here is your link:\n ${shortUrl}`;
    
//Send Msg
        const response = await axios.post(MOBIZON_API_SendMessage, null, {
            params: {
                apiKey: API_KEY,
                recipient: recipient,
                text: message
            }
        });

        if (response.data.code === 0) {
            console.log('SMS sent successfully!');
            } else {
            console.error(`Error sending SMS: ${response.data.message}`);
        }
    } catch (error) {
        console.error(`HTTP Error: ${error.message}`);
    }
}

const send_check_option = async(phone, msg) => {
    try {
        const response = await axios.post(MOBIZON_API_SendMessage, null, {
            params: {
                apiKey: API_KEY,
                recipient: phone,
                text: msg
            }
        });
        if (response.data.code === 0) {
            console.log('SMS sent successfully!');
            } else {
            console.error(`Error sending SMS: ${response.data.message}`);
        }
    } catch (error) {
        console.error(`HTTP Error: ${error.message}`);
    }
}

module.exports = { send_verify_sms, send_check_option };
