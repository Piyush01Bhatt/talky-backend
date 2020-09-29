import { UserModel } from "../db_models/dbUser.js"
import FriendsModel from "../db_models/dbFriends.js"

export function checkGetUsersRequest(req, res, next) {
    const reqBody = req.body;
    if (reqBody && (req.queryName && req.initial && req.last_id && reqBody.user_id)) {
        next()
    }
    return res.status(400).send({
        body: {
            success: false,
            message: "missing request",
        },
    });
}

export async function queryDb(req) {
    try {
        const reqBody = req.body
        let dbUsers;
        if (reqBody.initial) {
            dbUsers = await UserModel.find({ name: reqBody.queryName }, null, { limit: 10 }).exec();
        } else {
            dbUsers = await UserModel.find({ name: reqBody.queryName, _id: { $gt: reqBody.last_id } }, null, { limit: 10 }).exec();
        }
        if (!dbUsers) {
            return new Error("can't query db")
        }
        if (dbUsers.length < 1) {
            return new Error("empty array returned")
        }
        return dbUsers
    } catch (e) {
        return new Error(e.message)
    }
}

export async function getFriendRequestInfo(dbUsers, u_id) {
    try {
        for (let i = 0; i < dbUsers.length; i++) {
            const user = dbUsers[i];
            let friend = await FriendsModel.find({ u_id: user._id, fo_id: u_id }).exec();
            if (!friend) {
                dbUsers[i].requested = false;
                dbUsers[i].accepted = false;
            } else {
                dbUsers[i].requested = true;
                dbUsers[i].accepted = friend.accepted;
            }
        }
        return dbUsers
        } catch (e) {
        return new Error(e.message)
    }
}

