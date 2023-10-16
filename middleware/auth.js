const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const { HttpError } = require("../utilities/index");
const { findUserByEmail } = require("../service/index");

const { JWT_SECRET } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await findUserByEmail(jwtPayload.email);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(e, false);
    }
  })
);


// ? Функція аутентифікує користувача по JWT. Використовувати як мідлвару.
const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (err || !user) {
      return next(HttpError(401));
    }
    req.user = user;
    next();
  })(req, res, next);
  // ? IIFE - passport.auth має приймати req, res, next, тому він одразу після конфігурування негайно викликається із цими аргументами.
};

module.exports = {
  auth,
};
