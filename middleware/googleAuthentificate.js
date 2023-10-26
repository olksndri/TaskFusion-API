const passport = require("passport")
const { Strategy } = require("passport-google-oauth2")
const bcrypt = require("bcryptjs");
const { User } = require("../service/schemas/users");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;
const { nanoid } = require("nanoid");

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName, picture } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({ email, avatar:picture, password, name: displayName });
    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};
const googleStategy = new Strategy(googleParams, googleCallback)

passport.use("google", googleStategy)

module.exports = passport