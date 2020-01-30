/**
 * @reports.service.js
 *
 * api related functionalities are written below
 */

/**
 * Loading Application level configuration data
 */
var config = require('../config/config.json');
var winston = require('../config/winston');

'use strict';
const nodemailer = require('nodemailer');


var _this = this;
var api = {};
api.sendEmail = sendEmail;
module.exports = api;

/**
 * 
 * @param {*} sendEmail api is used send the email
 */
async function sendEmail(req) {
    return new Promise(async (resolve, reject) => {
        try {

            // console.log("req.headers['x-auth-token']",req.headers['x-auth-token']);

            if (req.headers['x-auth-token'] && req.headers['x-auth-token'] == config.token) {

                let testAccount = await nodemailer.createTestAccount();
                let transporter = nodemailer.createTransport(config.email_config);

                req.body.emails.forEach(function (ele) {
                    // send mail with defined transport object
                    let info = transporter.sendMail({
                        from: '<' + config.from_email_id + '>', // sender address
                        to: ele, // list of receivers
                        subject: req.body.subject, // Subject line
                        text: req.body.message // plain text body
                        // html: '<b>Hello world?</b>' // html body
                    });

                    winston.log(info);

                });



                // console.log('Message sent: %s', info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                // Preview only available when sending through an Ethereal account
                // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


                // main().catch(console.error);
                return resolve({
                    status: "success",
                    message: "successfully mail sent",
                })

            } else {
                return resolve({
                    status: "failed",
                    message: "invalid token ",
                })
            }

        } catch (error) {
            return reject({
                status: "failed",
                message: error,
                errorObject: error
            });
        }
        finally {
        }
    });
}

