const Auth = (req, res, mext) => {
    if (!req.session.logged_in) {
        res.redirect('/login') // may need to be /api/users/login
    } else {
        next();
    }
};

module.exports = Auth;