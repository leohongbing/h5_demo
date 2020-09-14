/**
 * Created by lhb on 2020/9/14
 *
 * Description:
 * <p>
 */
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  debugger
  console.log(ctx.query)
  ctx.body = `${ctx.query.cb}('hello')`;
});

app.listen(3000);
