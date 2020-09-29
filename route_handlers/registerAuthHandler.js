import { TempUserModel, UserModel } from "../db_models/dbUser.js";

export function checkRegisterAuthRequest(req, res, next) {
  const reqBody = req.body;
  if (
    reqBody &&
    reqBody.email &&
    reqBody.otp
  ) {
    next();
  } else {
    return res.status(400).send({
      body: {
        success: false,
        message: "missing request",
      },
    });
  }
}

export async function findUser(req, res, next) {
  try {
    const dbUser = await UserModel.findOne({ email: req.email }).exec();
    if (dbUser) {
      return res.status(200).send({
        body: {
          success: false,
          message: "user already exists",
        },
      });
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      body: {
        success:false,
        message: "error in querying db",
      },
    });
  }
}

export async function findTempUser(reqBody) {
  try {
    const dbData = await TempUserModel.findOne({
      email: reqBody.email,
    }).exec();
    if (!dbData) {
      return new Error("not registered");
    }
  } catch (error) {
    return new Error(error.message);
  }
}

export function verifyOtp(dbOtp, reqOtp) {
  if (!(dbOtp === reqOtp)) {
    return new Error('wrong otp')
  }
}

