const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('../views/links/add');
});

router.post('/add', async(req, res) => {
    const {titulo, url, descripcion} = req.body;
    const newLink = {
        titulo,
        url,
        descripcion
    }
    const sql= ("INSERT INTO links (title, url, descripcion) VALUES ('"+titulo+"', '"+url+"', '"+descripcion+"');")
  await pool.query(sql, [newLink]);
    res.redirect('/links');

});

router.get('/', async(req, res) => {
   const links = await pool.query('SELECT * FROM links');
   res.render('links/lista', { links });
});





module.exports = router;