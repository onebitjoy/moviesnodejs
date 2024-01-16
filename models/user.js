import pkg from "bcryptjs"
const { hash, compare } = pkg
import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import jwt from "jsonwebtoken"
import CustomError from "../utils/CustomError.js";
import crypto from "crypto"

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
  role: {
    type: String,
    enum: ["user", "admin", "manager"],
    default: "user"
  },
  tokens: [{
    token: { type: String, required: true }
  }],
  photo: String,
  passwordChangedAt: {
    type: Date
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
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

},
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hash(user.password, 12)
  }
  next()
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified('password') || this.isNew) return next()
  this.passwordChangedAt = Date.now() - 1000
  next()
})

UserSchema.methods.isPasswordChanged = async function (JWTIssueTime) {
  if (this?.passwordChangedAt) {
    const passwordChangeTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
    return passwordChangeTime > JWTIssueTime
  }
  return false
}

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY })

  user.tokens = user.tokens.concat({ token: token })
  await user.save()

  return token
}

UserSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.__v
  delete userObj.updatedAt
  delete userObj.createdAt
  delete userObj.tokens
  delete userObj?.passwordConfirm
  delete userObj?.password
  delete userObj?.active

  return userObj
}

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 mins from now

  return resetToken
}

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

const User = model('User', UserSchema)
export default User