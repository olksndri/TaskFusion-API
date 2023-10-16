const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = require("../service/schemas/users");


const { httpError } = require("../utilities/index");
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
      return next(httpError(401));
    }
    req.user = user;
    next();
  })(req, res, next);
  // ? IIFE - passport.auth має приймати req, res, next, тому він одразу після конфігурування негайно викликається із цими аргументами.
};


// ? Функція аутентифікує користувача по JWT. Використовувати як мідлвару.
const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(httpError(401));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(httpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(httpError(401));
  }
};

// ? Функція створює токен та записує у req.user.token. Використовувати як мідлвару.
const createToken = (req, res, next) => {
  const payload = { email: req.body.email };
  const token = jwt.sign(payload, JWT_SECRET);
  req.user.token = token;
  next();
};

module.exports = {
  auth,
  createToken,
  authenticate,
};
