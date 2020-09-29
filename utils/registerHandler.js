import { UserModel }from "./dbUser.js";

export function checkRegisterRequest(req, res, next) {
  const reqBody = req.body;
  if (reqBody && reqBody.name && reqBody.password && reqBody.email) {
    next();
  }
  return res.status(400).send({
    body: {
      success: false,
      message: "missing request",
    },
  });
}

export async function checkAlreadyExists(req, res, next) {
  try {
    const userData = req.body;
    let dbData = await UserModel.findOne({ email: userData.email }).exec();
    if (dbData) {
      return res.status(200).send({
        body: {
          data: {},
          message: "user already exists",
        },
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      body: {
        data: {},
        message: err.message,
      },
    });
  }
}
