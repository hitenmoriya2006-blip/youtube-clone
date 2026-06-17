const mongoose = require('mongoose')
const mongooseAggregatePaginate = require('mongoose-paginate-v2')

const videoSchema = new mongoose.Schema({
   videoFile: {
      type: String,
      required: true
   },
   thumbnail: {
      type: String,
      required: true
   },
   title: {
      type: String,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   channelName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
   isPubblished: {
      type: Boolean,
      default: true
   },
   views: {
      type: Number,
      default: 0
   },
   duration: {
      type: Number,
      required: true
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
   }
}, {
   timestamps: true
})

videoSchema.plugin(mongooseAggregatePaginate)

export const videoModel = mongoose.model('Video', videoSchema)