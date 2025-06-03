const twilio = require('twilio');
require('dotenv').config({ path: __dirname +'/../../.env' });
   

  const account = process.env.TWILIO_ACCOUNT_SID;
 const token = process.env.TWILIO_AUTH_TOKEN;
 const twilio_number= process.env.TWILIO_PHONE_NUMBER;
 

const client = new twilio(account,token);

const otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  otpStore[phone] = otp;

  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilio_number,
      to: `+91${phone}`
    });
     
    res.status(200).json({ success: true,otp : otp, message: '✅ OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

