import { asyancHandler } from "../utils/asyancHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyancHandler( async (req,res) => {
  //get user details from frontend
  //validation  - not empty
  // check if user alredy exisits : username , email
  // check for image,check for avtar
  // upload them to cloudinary, avtar
  //create user object - create entry in db
  //remove password and refresh token field from response
  //check for user creation 
  //return res

  const {fullName, email, userName, password} = req.body
  console.log(fullName,email);

  if(
      [fullName, email, userName, password].some((filed)=>filed?.trim()==="")
  ){
      throw new ApiError(400, "All fileds are required")
  }
  
  const existedUser = User.findOne({
      $or:[{ userName },{ email }]
  })

  if(existedUser){
      throw new ApiError(409, "User with email or userName")
  }
  
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImagePath = req.files?.coverImage[0].path?.path;

  if(avatarLocalPath){
      throw new ApiError(400,"Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagePath);

  if(!avatar){
      throw new ApiError(400,"Avatar file is required")
  }

  const user = await User.create({
      fullName,
      avatar:avatar.url,
      coverImage:coverImage?.url || "",
      email,
      password,
      userName:userName.toLowerCase()
  })

  const createdUser = await User.findById(User._id).select(
      "-password -refreshToken"
  )

  if(!createdUser){
      throw new ApiError(500,"something went wrong will register User")
  }

  return res.status(201).json(
      new ApiResponse(200,createdUser,"User registered successfuly")
  )
})


export {registerUser}