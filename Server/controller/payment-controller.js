import formidable from 'formidable';
import https from 'https';
import paytmchecksum from '../paytm/PaytmChecksum.js';
// import { paytmParams, paytmMerchantkey,phonepeParams } from '../Index.js';
import dotenv from 'dotenv';
import crypto from 'crypto';
import axios from 'axios';

dotenv.config();


export const addPaymentGateway = async (request, response) => {
    try {
        let paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
        let params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        }
        response.status(200).json(params);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

export const paytmResponse = (request, response) => {
    const form = formidable({ multiples: true });

    form.parse(request, (err, fields, files) => {
        if (err) {
            return response.status(500).json({ error: err.message });
        }

        let paytmCheckSum = fields.CHECKSUMHASH;
        delete fields.CHECKSUMHASH;

        let isVerifySignature = paytmchecksum.verifySignature(fields, paytmMerchantkey, paytmCheckSum);
        if (isVerifySignature) {
            let paytmParams = {};
            paytmParams['MID'] = fields.MID;
            paytmParams['ORDERID'] = fields.ORDERID;

            paytmchecksum.generateSignature(paytmParams, paytmMerchantkey).then(function (checksum) {
                paytmParams['CHECKSUMHASH'] = checksum;

                let post_data = JSON.stringify(paytmParams);

                let options = {
                    hostname: 'securegw-stage.paytm.in',
                    port: 443,
                    path: '/order/status',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                }

                let res = "";
                let post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        res += chunk;
                    });

                    post_res.on('end', function () {
                        let result = JSON.parse(res);
                        response.redirect('http://localhost:3000/');
                    });
                });

                post_req.write(post_data);
                post_req.end();

            }).catch(error => {
                response.status(500).json({ error: error.message });
            });
        } else {
            console.log('Checksum mismatched');
        }
    });
}



let salt_key = process.env.SALT_KEY
let merchant_id = process.env.MERCHANT_ID

export const phonepeintegration = async (req, res) => {
    try {
        console.log(req.body);

        const merchantTransactionId = req.body.transactionId;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: req.body.MUID,
            name: req.body.name,
            amount: req.body.amount * 100,
            redirectUrl: `http://localhost:8000/status/?id=${merchantTransactionId}`,
            redirectMode: 'POST',
            mobileNumber: req.body.number,
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };
        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + salt_key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;

        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        await retryRequest(options, 3, res);

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        });
    }
};

const retryRequest = async (options, retries, res) => {
    let attempts = 0;
    while (attempts < retries) {
        try {
            const response = await axios.request(options);
            console.log(response.data);
            return res.json(response.data);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                attempts++;
                const delay = Math.pow(2, attempts) * 1000;
                console.log(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
    res.status(429).send({
        message: 'Too many requests. Please try again later.',
        success: false
    });
};

export const statusCheck = async (req, res) => {
    const merchantTransactionId = req.query.id;
    const merchantId = merchant_id;

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;

    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };

    axios.request(options).then(async (response) => {
        if (response.data.success === true) {
            const url = `http://localhost:5173/success`;
            return res.redirect(url);
        } else {
            const url = `http://localhost:5173/failure`;
            return res.redirect(url);
        }
    }).catch((error) => {
        console.error(error);
        res.status(500).send({
            message: error.message,
            success: false
        });
    });
};