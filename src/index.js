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
  var str = user.JoinUser(data);
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
