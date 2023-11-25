const User = require("../model/User");

const findUsers = () => {
  return User.find();
};

const createNewUser = ({ name, sectors, agreeTerms }) => {
  const user = new User({
    name,
    sectors,
    agreeTerms,
  });
  return user.save();
};

const findUserByProperty = (key, value) => {
  // console.log("Key", key, "Value: ", value);
  if (key === "_id") {
    return User.findById(value);
  }

  return User.findOne({ [key]: value });
};

module.exports = {
  createNewUser,
  findUsers,
  findUserByProperty,
};
