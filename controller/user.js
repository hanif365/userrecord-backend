const userService = require("../service/user");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found!", 404);
    }
    return res.status(200).json(user);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const postUser = async (req, res, next) => {
  const { name, sectors, agreeTerms } = req.body;
  try {
    const user = await userService.createNewUser({
      name,
      sectors,
      agreeTerms,
    });
    return res
      .status(201)
      .json({ message: "User created successfully!", user });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found!", 404);
    }

    await user.deleteOne();
    return res.status(203).send({ message: "User deleted Successfully!" });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};
const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, sectors, agreeTerms } = req.body;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("User not found", 404);
    }

    user.name = name ?? user.name;
    user.sectors = sectors ?? user.sectors;
    user.agreeTerms = agreeTerms ?? user.agreeTerms;

    await user.save();
    return res
      .status(200)
      .json({ message: "User Updated Successfully!", user });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  deleteUserById,
  patchUserById,
};
