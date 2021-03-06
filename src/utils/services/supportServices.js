const randomString = require('randomstring')
const nodemailer = require('nodemailer')
const config = require('config')

const { RANDOM_STRING_FOR_CONCAT } = require('../constants/number')

const generateRandomStringAndNumber = (length) => {
  return randomString.generate({
    length
  })
}

const generateRandomString = (length) => {
  return randomString.generate({
    length,
    charset: 'alphabetic'
  })
}

const generateRandomNumber = (length) => {
  return randomString.generate({
    length,
    charset: 'numeric'
  })
}

const sendMailVerification = async (model) => {
  var mailOptions

  var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: config.get('devEmail'),
      pass: config.get('devAuth')
    }
  }

  const transporter = nodemailer.createTransport(smtpConfig)
  // const transporter = nodemailer.createTransport({
  //   service: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: config.get('mongoDB.email'),
  //     pass: config.get('mongoDB.password')
  //   }
  // })
  if (model.type === 'otp') {
    mailOptions = {
      from: config.get('mongoDB.email'),
      to: model.email,
      subject: 'Tokoonline',
      text: `Your OTP is ${model.otp}`
    }
  }
  if (model.type === 'signup') {
    mailOptions = {
      from: 'prismalinkdev@gmail.com',
      to: model.email,
      subject: 'Tokoonline',
      text: `Thank you for applying on Tokoonline. We are looking forward for your action in changing your name and password.
          name: ${model.username}
          password: ${model.password}`
    }
  }

  if (model.type === 'signupUser') {
    mailOptions = {
      from: 'prismalinkdev@gmail.com',
      to: model.email,
      subject: 'Tokoonline',
      text: `Thank you for applying on Tokoonline. We are looking forward for your action in changing your name and password.
          password: ${model.password}`
    }
  }

  if (model.type === 'forgetPasswordSendOtp') {
    mailOptions = {
      from: 'prismalinkdev@gmail.com',
      to: model.email,
      subject: 'Tokoonline',
      text: `Thank you for trusting us. use this otp to change your password
          otp: ${model.otp}`
    }
  }
  if (model.type === 'paymentProcessSendOtp') {
    // type: 'paymentProcessSendOtp',
    //   email,
    //   otp: otpString || generateRandomNumber(4),
    //   emailBody,
    //   emailSubject
    mailOptions = {
      from: 'prismalinkdev@gmail.com',
      to: model.email,
      subject: model.emailSubject || 'Plink Market Validasi Email Untuk Pembayaran',
      text: model.emailBody || `Gunakan Otp berikut, untuk melakukan validasi email.
          otp: ${model.otp}`
    }
  }
  if (model.type === 'purchaseorderCheckStatusRequestOtp') {
    // type: 'paymentProcessSendOtp',
    //   email,
    //   otp: otpString || generateRandomNumber(4),
    //   emailBody,
    //   emailSubject
    mailOptions = {
      from: 'prismalinkdev@gmail.com',
      to: model.email,
      subject: model.emailSubject || 'Plink Market Validasi Email',
      text: model.emailBody || `Gunakan Otp berikut, untuk melakukan validasi email.
          otp: ${model.otp}`
    }
  }

  if (model.type === 'merchantSignup') {
    mailOptions = {
      from: config.get('mongoDB.email'),
      to: model.email,
      subject: 'Tokoonline',
      text: `Thank you for joining Tokoonline. We are looking forward for your action in finishing your identification.
            password: ${model.password}`
    }
  }

  if (model.type === 'institutionSignup') {
    mailOptions = {
      from: config.get('mongoDB.email'),
      to: model.email,
      subject: 'Tokoonline',
      text: `Thank you for joining Tokoonline. We are looking forward for your action in finishing your identification.
            password: ${model.password}`
    }
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    throw new Error(err)
  }
}

const generateID = () => {
  return new Date().getTime() + generateRandomString(RANDOM_STRING_FOR_CONCAT)
}

const getUnixTime = () => {
  return new Date().getTime()
}

const isEqual = (newUsername) => {
  var regex = new RegExp(['^', newUsername, '$'].join(''), 'i')
  return regex
}

const Response = ({ statusCode = null, errorMessage = null, successMessage = null }) => {
  return {
    status: statusCode,
    error: errorMessage,
    success: successMessage
  }
}

module.exports.generateRandomStringAndNumber = generateRandomStringAndNumber
module.exports.generateRandomString = generateRandomString
module.exports.generateRandomNumber = generateRandomNumber
module.exports.sendMailVerification = sendMailVerification
module.exports.generateID = generateID
module.exports.getUnixTime = getUnixTime
module.exports.isEqual = isEqual
module.exports.Response = Response
