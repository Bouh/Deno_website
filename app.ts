import {
  createError,
  dirname,
  IError,
  join,
  json,
  NextFunction,
  opine,
  renderFileToString,
  Request,
  Response,
  serveStatic,
  urlencoded,
} from "./deps.ts";

import indexRouter from "./views/index/index.ts";
import usersRouter from "./views/users/users.ts";
import courseRouter from "./views/course/course.ts";

const app = opine();

// View engine setup
app.set("views", `${Deno.cwd()}/views`);
app.set("view engine", "ejs");
app.engine("ejs", renderFileToString);

// Handle different incoming body types
app.use(json());
app.use(urlencoded());

// Serve our static assets

app.use(serveStatic(`${Deno.cwd()}/public`));

// Mount our routers
app.use("/", indexRouter);
app.use("/users/", usersRouter);
app.use("/course/", courseRouter);

// Handling HTTP errors
// catch 404 and forward to error handler

app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use(
  function (err: IError, req: Request, res: Response, next: NextFunction) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.setStatus(err.status || 500);
    res.render("error");
  },
);

export default app;
