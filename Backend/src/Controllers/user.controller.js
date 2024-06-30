import { User } from "../Models/user.model.js";
import { ApiError } from "../Utils/apiError.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

const generateAccessToken = async (userID) => {
  try {
    const user = await User.findOne({ _id: userID });
    const accessToken = user.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Error generating access token", error);
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Please provide username and password");
  }

  if (await User.findOne({ username })) {
    throw new ApiError(401, "User already exists");
  }

  const user = await User.create({
    username,
    password,
  });

  const accessToken = await generateAccessToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Please provide username and password");
  }
  const user = await User.findOne({ username });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  if (!(await user.checkPassword(password))) {
    throw new ApiError(401, "Incorrect password");
  }

  const accessToken = await generateAccessToken(user._id);
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, "Login successful", user));
});
