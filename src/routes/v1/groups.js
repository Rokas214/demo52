const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtSecret } = require('../../config');

const router = express.Router();


const { isLoggedIn } = require('../../middleware');


router.get('/groups', isLoggedIn ,async (req, res) => {
  try {
  const con = await mysql.createConnection(dbConfig);
  const [data] = await con.execute('SELECT * FROM cao_group');
  await con.end();
  
  return res.send(data);
  } catch (err) {
  return res.status(500).send({ err });
  }
  });


  router.post('/groups', isLoggedIn ,async (req, res) => {
    if (
    !req.body.name
    ) {
    return res.status(400).send({ err: 'Incorrect data passed' });
    }
    
    try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
    `INSERT cao_group(name)
    VALUES ('${req.body.name}')`,
    );
    console.log("Success")
    alert("Successfuly added")
    await con.end();
    
    return res.send(data);
    } catch (err) {
    return res.status(500).send({ err: "Please try again" });
    }
  });



module.exports = router;
