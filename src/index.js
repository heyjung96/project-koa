const Koa = require("koa");
const Router = require("koa-router");
const koabody = require("koa-body");

const app = new Koa();
const router = new Router();
const user = require("./controller/Join");

if (process.env.NODE_ENV === "develop") {
  require("dotenv").config();
}

/* router */
router.post("/users/join", koabody(), async (ctx) => {
  var data = ctx.request.body;
  const statusCode = await user.JoinUser(data);
  if (statusCode == 200) {
    data = "회원가입 완료되었습니다.";
  } else if (statusCode == 400) {
    data = "필수값이 누락되어있습니다.";
  } else if (statusCode == 403) {
    data = "이미 가입되어있는 이메일입니다.";
  } else {
    data = "쿼리에러입니다.";
  }
  ctx.body = data;
});

router.get("/", (ctx, next) => {
  ctx.body = "홈";
});

/* app */
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Listening to port 3000!");
});
