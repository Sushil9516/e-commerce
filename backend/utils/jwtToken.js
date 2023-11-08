// Create Token and saving in cookie

// const { setDefaultHighWaterMark } = require("nodemailer/lib/xoauth2");

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ), 
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    // 'token' this is a keyword and token is a actual token
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
