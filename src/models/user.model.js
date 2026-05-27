const mongoose = require('mongoose')
const brycpt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
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
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = brycpt.hash(this.password, 10)
        next()
    }
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await brycpt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign({
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
    jwt.sign({
        _id: this._id,
    },
        process.env.ACCESS_REFRESH_SECRET,
        {
            expiresIn: process.env.ACCESS_REFRESH_VALID
        }
    )
}

export const userModel = mongoose.model('User', userSchema)

l