const passport = require("koa-passport");
console.log("/model/auth");
const { loginUser } = require("../model/User");

const fetchUser = (() => {
  console.log("/model/auth fetchUser");
  // This is an example! Use password hashing in your project and avoid storing passwords in your code

  return async function (username, password) {
    user = await loginUser(username, password)
    return user;
  };
})();

passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  console.log("deserializeUser");
  try {
    const user = await fetchUser();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("LocalStrategy password >> ",password);
    fetchUser(username, password)
      .then((user) => {
        console.log("LocalStrategy", user);

        if (user === true) {  //회원 - 로그인 성공
          done(null, username);
        } else {
          done(null, false);
        }
      })
      .catch((err) => done(err));
  })
);

// const FacebookStrategy = require("passport-facebook").Strategy;
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: "your-client-id",
//       clientSecret: "your-secret",
//       callbackURL:
//         "http://localhost:" +
//         (process.env.PORT || 3000) +
//         "/auth/facebook/callback",
//     },
//     function (token, tokenSecret, profile, done) {
//       // retrieve user ...
//       fetchUser().then((user) => done(null, user));
//     }
//   )
// );
