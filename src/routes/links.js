const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('../views/links/add');
});

router.post('/add', isLoggedIn, async(req, res) => {
    const {title, url, descripcion} = req.body;
    const newLink = {
        title,
        url,
        descripcion
    }
    const sql= ("INSERT INTO links (title, url, descripcion) VALUES ('"+title+"', '"+url+"', '"+descripcion+"');")
  await pool.query(sql, [newLink]);
    res.redirect('/links');

});

router.get('/', isLoggedIn, async(req, res) => {
   const links = await pool.query('SELECT * FROM links');
   res.render('links/lista', { links });
});

router.get('/eliminar/:id', isLoggedIn, async(req, res) => {
    const id = req.params.id;
    await pool.query("DELETE FROM links WHERE id = ?", [id]);
    res.redirect ('/links');
});

router.get('/editar/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links[0].descripcion);
    res.render('links/editar', {link: links[0]});
});

router.post('/editar/:id', isLoggedIn, async(req, res) => {
    const newLink = req.body;
    const { id } =req.params;
    const sql = 'update links set ? where id = ?';
    await pool.query(sql, [newLink, id]);
    res.redirect('/links')
});

module.exports = router;