const Koa = require("koa");
const Router = require("koa-router");
// const koabody = require("koa-body");

const app = new Koa();
const router = new Router();
const user = require("./controller/Join");

// body parser
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
}
/* router */
router.post("/users/join", async (ctx) => {
  console.log("/users/join");
  let result = await user.JoinUser(ctx.request.body);

  ctx.status = result.statusCode;
  ctx.body = result.message;
});

router.get("/", (ctx, next) => {
  ctx.body = "홈";
});


/* login START */
const passport = require("koa-passport");
require("./controller/auth");

router.post("/login/local", function (ctx) {
  return passport.authenticate("local", function (err, user, info, status) {
    if (user === false) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {  //참
      ctx.status = 200;
      ctx.body = "너는 회원입니다이다 ";
    }
  })(ctx);
});

router.post("/login/facdbook", function (ctx) {
  return passport.authenticate("facdbook", function (err, user, info, status) {
    if (user === false) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {  //참
      ctx.status = 200;
      ctx.body = "너는 회원입니다이다 ";
    }
  })(ctx);
});
/* login END */


/* app */
app.use(router.routes());
app.use(router.allowedMethods());


// Require authentication for now
app.use(function (ctx, next) {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect("/");
  }
});

app.listen(3000, () => {
  console.log("Listening to port 3000!");
});
