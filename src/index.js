const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");
const passport = require("passport");

const {database} = require("./keys")


//initialization 
const app = express();
require('./lib/passport');


//settings 
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs ({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
}));
app.set("view engine", ".hbs");

//middlewares
app.use(session({
    secret:"xavimysqlnodesession",
    resave: false, 
    saveUninitialized: false, 
    store: new MySQLStore (database)
}));
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//routes 
app.use(require("./routes/index"));
app.use(require("./routes/autentications"));
app.use("/links", require("./routes/links"));


//global variables
app.use((req, res, next) =>{
    app.locals.user = req.user;
    next();
});

//public 
app.use(express.static(path.join(__dirname, "public")));

// starting the server
app.listen(app.get("port"), () =>{
    console.log("listening on port", app.get("port"));
});