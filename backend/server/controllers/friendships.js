const UserModel = require('../models/users');
const FriendshipsModel = require('../models/friendships');
const {
  InternalServerError,
  BadRequestError } = require('../utils/errors');

const addFriendship = async (req, res, next) => {
  const { id: user_id } = res.locals.data.user;
  const { user_id: friend_id } = req.query;

  try {
    const response = await FriendshipsModel.addFriendship(user_id, friend_id);
    const friend = await UserModel.getUserById(friend_id);

    res.locals.data = {
      id: friend.id,
      username: friend.username
    };

    res.status(201);
    next();
  } catch (err) {
    next(new InternalServerError(err));
  }
}

const getFriendIds = async (req, res, next) => {
  const { user_id } = req.query;
  try {
    const friends = await FriendshipsModel.getFriendIds(user_id);
    res.locals.data = { friends };
    next();
  } catch (err) {
    console.log(err)
    next(new BadRequestError(err));
  }
}

module.exports = {
  addFriendship,
  getFriendIds
}