const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy ({
    username:'username',
    password:'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if(rows.length > 0) {
        const user = rows[0];
        const validoPassword = await helpers.matchPassword(password, user.password);
        if(validoPassword) {
            done(null, user, req.flash('Bienevenido '+ user.username));
        } else {
            done(null, false, req.flash('constraseña incorrecta'));
        }
    }else{
        done(null, false, req.flash('el usuario es incorrecto'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const newUser = req.body;
   
    newUser.password = await helpers.encryptPassword(password);
    const sql = "INSERT INTO users (username, password, fullname) VALUES ('"+newUser.username+"','"+newUser.password+"','"+newUser.fullname+"')";
    const resultado = await pool.query(sql);
    newUser.id = resultado.insertId;
    return done(null, newUser);
}));

passport.serializeUser ((user ,done) => {
    done(null, user.id);
});

passport.deserializeUser( async(id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = '+id);
    done(null, rows[0]);
});