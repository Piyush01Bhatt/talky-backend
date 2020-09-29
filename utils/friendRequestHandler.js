import FriendsModel from "../utils/dbFriends.js";

export function checkFriendRequest(req, res, next) {
  /**
   * u_id : id of the person to whom friend request is sent
   * name : name of the person to whom friend request is sent
   * status: status of the person to whom friend request is sent
   * fo_id : id of the person from whom friend request was sent
   */
  const reqBody = req.body;
  if (
    reqBody &&
    reqBody.u_id &&
    reqBody.name &&
    reqBody.status &&
    reqBody.fo_id
  ) {
    next()
  } else {
    return new Error("Missing Request");
  }
}

export async function saveFriendRequest(reqBody) {
  try {
    let friend = await FriendsModel.findOne({
      u_id: reqBody.u_id,
      fo_id: reqBody.fo_id,
    }).exec();
    if (friend) {
      return new Error("already requested");
    }
    let newFriend = await FriendsModel.create({
      name: reqBody.name,
      status: reqBody.status,
      u_id: reqBody.u_id,
      fo_id: reqBody.fo_id,
    });
    if (!newFriend) {
      return new Error("error creating friend");
    }
    return newFriend
  } catch (e) {
    return new Error(e.message)
  }
}

