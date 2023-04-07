const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    throw new BadRequestError("please fill in all fields");
  }

  const uniqueEmail = await User.findOne({ email })

  if (uniqueEmail){
    throw new BadRequestError('Email already in use')
  }
  //we can Use a package called validator to check
  //if the email is a valid one and if the passord is strong 



  const user = await User.create({ ...req.body });
  const token = user.getJWT();

  res.status(StatusCodes.CREATED).json({ email : user.email, token });
};

const login = async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const doPasswordMatch = await user.comparePassword(password)
    if (!doPasswordMatch) {
        throw new UnauthenticatedError('Incorrect password')
    }
    const token = user.getJWT()
    res.status(StatusCodes.OK).json({ email: user.email, token });
};


module.exports = { login, register };
