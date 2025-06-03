const nodemailer = require('nodemailer');
  require('dotenv').config({ path: __dirname +'/../../.env' });


   const userGmail = process.env.GMAIL;
   const userPass = process.env.PASS;

   function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}


 exports.sendEmailOTP = async (req, res) => {
    const {gmail} = req.body
      const otp = generateOTP();

    
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: userGmail,
      pass: userPass
    }
  });

  const mailOptions = {
    from: userGmail,
    to: gmail,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`
  };

 const chk = await transporter.sendMail(mailOptions);
  if(chk){return res.status(200).json({ message: "✅ otp sent successfully" ,otp : otp });}

      
};


