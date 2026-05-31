import mongoose from 'mongoose'
import brycpt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avtar: {
        type: String
    },
    coverImage: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next()

    this.password = await brycpt.hash(this.password, 10)

    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await brycpt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_VALID
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_VALID
        }
    )
}

export const userModel = mongoose.model('User', userSchema)
