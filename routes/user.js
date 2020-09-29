import express from "express";
import { TempUserModel, UserModel } from "../utils/dbUser.js";
import crypto from "crypto";
import { genOtp } from "../utils/otpGen.js";
import sendMail from "../utils/sendMail.js";
import checkLoginRequest, { checkPassword, findUser } from "../utils/loginHandler.js";
import { checkGetUsersRequest, getFriendRequestInfo, queryDb } from "../utils/getUsersHandler.js";
import { checkRegisterAuthRequest, findTempUser, verifyOtp } from "../utils/registerAuthHandler.js"
import { checkAlreadyExists, checkRegisterRequest } from "../utils/registerHandler.js"

export const userRouter = express.Router();

/** user register route */
userRouter.route("/register").post(
  checkRegisterRequest,
  checkAlreadyExists,
  async (req, res) => {
    // route to create a temp data of user with otp
    try {
      await TempUserModel.findOneAndRemove({ email: userData.email }).exec();
      const userData = req.body;
      const hash = crypto
        .createHash("md5")
        .update(userData.password)
        .digest("hex");
      const otp = genOtp();
      userData.password = hash;
      userData.otp = otp;
      const tempUser = await TempUserModel.create(userData);
      if (!tempUser) {
        return res.status(500).send({
          success: false,
          message: "error querying db",
        });
      }
      sendMail(tempUser.email, "verification otp", tempUser.otp);
      res.status(201).send({
        body: {
          success: true,
          message: "temp user created ",
        },
      });
    } catch (err) {
      return res.status(400).send({
        body: {
          success: false,
          message: err.message,
        },
      });
    }
  }
);

/***  auth route  */
userRouter.post(
  "/auth",
  checkRegisterAuthRequest,
  findUser,
  async (req, res) => {
    const userData = req.body;
    try {
      const dbData = await findTempUser(userData)
      const dbOtp = dbData.otp;
      verifyOtp(dbOtp, userData.otp)
      const permUser = {
        name: dbData.name,
        email: dbData.email,
        password: dbData.password,
      };
      
      await UserModel.create(permUser)
      res.status(201).send({
        body: {
          success: true,
          message: "user created successfully",
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(400).send({
        body: {
          success: false,
          message: err.message,
        },
      });
    }
  }
);

/** login route */
userRouter.post('/login', async (req, res) => {
  try {
    const reqBody = checkLoginRequest(req);
    const userData = await findUser(reqBody);
    const resolvedUser = checkPassword(userData, reqBody.password)
    return res.status(200).send({
      body: {
        success: true,
        data: resolvedUser,
        message: "user found",
      },
    });
  } catch (err) {
    return res.status(400).send({
      body: {
        success: false,
        data: {},
        message: err.message
      }
    })
  }
})


// get_users route
userRouter.get('/get_users',
  checkGetUsersRequest,
  async (req, res) => {
    try {
      const dbUsers = await queryDb(req)
      const lastId = dbUsers[dbUsers.length - 1]._id
      const newDbUsers = await getFriendRequestInfo(dbUsers, req.u_id)
      res.status(200).send({
        body: {
          success: true,
          data: newDbUsers,
          last_id: lastId,
          message: "found users"
        }
      })
    } catch (err){
      res.status(400).send({
        body: {
          success: false,
          message: err.message
        }
      })
    }
  }
)
