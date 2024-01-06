import pkg from "bcryptjs"
const { hash, compare } = pkg
import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import jwt from "jsonwebtoken"
import CustomError from "../utils/CustomError.js";

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: 8,
    maxLength: 80,
    select: false
  },

  // passwordConfirm: {
  //   type: String,
  //   required: [true, "Please confirm your password"],
  //   validate: {
  //     // this validator will only work for save & create only, not update
  //     validator: function (value) {
  //       return value === this.password
  //     },
  //     message: "Password do not match"
  //   }
  // },
  tokens: [{
    token: { type: String, required: true }
  }],
  photo: String
},
  {
    timestamps: true
  }
)

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY })

  user.tokens = user.tokens.concat({ token: token })
  await user.save()

  return token
}

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hash(user.password, 12)
    user.passwordConfirm = undefined
  }
  next()
})

UserSchema.statics.findByCredentials = async (email, password, next) => {

  if (!isEmail(email)) {
    const err = new CustomError("Invalid email!", 400)
    return next(err)
  }

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    const err = new CustomError("No user with the email found!", 400)
    return next(err)
  }

  const isMatch = await compare(password, user.password)

  if (!isMatch) {
    const err = new CustomError("Incorrect email or password!", 400)
    return next(err)
  }

  return user
}

UserSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.__v
  delete userObj.updatedAt
  delete userObj.createdAt
  delete userObj.tokens
  delete userObj.photo

  return userObj
}

const User = model('User', UserSchema)
export default User