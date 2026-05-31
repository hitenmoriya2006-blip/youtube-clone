import { asyncHandler } from "../utils/asyncHandler.js"

const userRegistration = asyncHandler(async (req,res) =>{
   res.status(200).json({
    message:'Okay hai naah jii'
   })
})

export {userRegistration}