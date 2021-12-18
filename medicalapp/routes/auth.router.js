import { Router } from "express";
import login from "../controllers/login.controller";
import passport from "passport";
require("../utils/passport");

const authRouter = Router();

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

/**
 * @swagger
 * securityDefinitions:
 *  medical_auth:
 *    type: bearer
 *    authorizationUrl: http://localhost:5000/api/oauth/authorize
 *  OAuth2:
 *   type: oauth2
 *   flow: accessCode
 *   authorizationUrl: http://localhost:5000/api/oauth/authorize
 *   tokenUrl: https://localhost:5000/api/oauth/token
 *   scopes:
 *     read: Grants read access
 *     write: Grants write access
 *     admin: Grants read and write access to administrative information
 */
    
/**
  * @swagger
  * /auth/login:
  *  post:
  *   tags:
  *    - "auth"
  *   summary: login with email and passsword
  *   description: Login with email and password
  *   parameters:
  *    - in: body
  *      name: body
  *      required: true
  *      description: auth credentials
  *      schema:
  *       type: array
  *       $ref: '#/definitions/User'
  *   responses:
  *    200:
  *     description: Logged in succesfully
  */
authRouter.post("/login", login);

authRouter.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
authRouter.get("/good", isLoggedIn, (req, res) =>
  res.send(`Welcome Mr. ${req.user.displayName}!`)
);

authRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

authRouter.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

export default authRouter;
