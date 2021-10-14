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
////////////////////////////////////////////////////

const passport = require("koa-passport");
require("./model/auth");
// console.log(passport);
router.post("/custom/login", function (ctx) {
  console.log("/custom/login");
  console.log(ctx);
  return passport.authenticate("local", function (err, user, info, status) {
    if (user === false) {
      console.log("/custom local");
      ctx.body = { success: false };
      ctx.throw(401);
    } else {
      console.log("/custom local else");
      ctx.body = { success: true };
      return "일단 뭐가 된다";
    }
  })(ctx);
});
////////////////////////////////////////////////////

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

/* app */
app.use(router.routes());
app.use(router.allowedMethods());

/////////////////////////////////////////////////
// Require authentication for now
app.use(function (ctx, next) {
  console.log("isAuthenticated t");
  // console.log(ctx);
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect("/");
  }
});

/////////////////////////////////////////////////
app.listen(3000, () => {
  console.log("Listening to port 3000!");
});
