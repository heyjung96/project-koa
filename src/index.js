const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();
const user = require("./controller/Join");

/* router */
router.post("/users/join", (ctx, next) => {
  var data = ctx;
  var str = user.JoinUser(data);
  console.log(str);

  console.log("지나갑니d다");
  // console.log(ctx.req);
  ctx.body = str;

  // ctx.body += "홈";
});

router.get("/", (ctx, next) => {
  console.log("지나갑니다");
  ctx.body = "홈";
});

/* app */
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Listening to port 3000!");
});
