const User = require("../models/user.js");
const passport = require("passport");

module.exports.renderSignupForm = (req,res)=> {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res)=> {
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err)=> {
        if(err) {
            return next();
        }
        req.flash("success", "Welcome to Wanderlust");
    res.redirect("/listings");
    });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=> {
    res.render("users/login.ejs");
};

module.exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);  // Handle any error from authentication
        }
        if (!user) {
            req.flash("error", "Invalid username or password");
            return res.redirect("/login");  // Redirect back to login if authentication fails
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);  // Handle any error during login
            }
            req.flash("success", "Welcome back to Wanderlust!");  // Success flash message
            let redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);  // Redirect to the listings page on successful login
        });
    })(req, res, next);  // This is crucial!
};

module.exports.logout = (req,res)=> {
    req.logout((err) => {
       if(err){
        return next(err);
       }
       req.flash("success", "You are logged out!");
       res.redirect("/listings");
    })};