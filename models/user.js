import { hash } from "bcryptjs";
import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

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
    maxLength: 40
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // this validator will only work for save & create only, not update
      validator: function (value) {
        return value === this.password
      },
      message: "Password do not match"
    }
  },
  photo: String
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

UserSchema.methods.toJSON = function () {
  const user = this
  const userObj = user.toObject()

  delete userObj.__v
  delete userObj.updatedAt
  delete userObj.createdAt

  return userObj
}

const User = model('User', UserSchema)
export default User