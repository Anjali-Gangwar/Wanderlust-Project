const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl}  = require("../middleware.js");

const userController = require("../controller/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup)
);

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, userController.login);


// router.post("/signup",
//     wrapAsync(async(req, res)=> {
//         try{
//             let{username, email, password} = req.body;
//             const newUser = new User({email, username});
//             const registeredUser = await User.register(newUser, password);
//             req.login(registeredUser, (err)=> {
//                 if(err) {
//                     return next();
//                 }
//                 req.flash("success", "Welcome to Wanderlust");
//                 res.redirect("/listings");
//             });
//         }catch(e) {
//             req.flash("error", e.message);
//             res.redirect("/signup");
//         }
//     })
// );

router.get("/logout", userController.logout);

module.exports = router;