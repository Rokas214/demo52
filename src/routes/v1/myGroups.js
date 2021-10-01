const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtSecret } = require('../../config');

const router = express.Router();


const { isLoggedIn } = require('../../middleware');

// router.get('/', isLoggedIn, (req, res) => {
//   console.log(req.user)
//   res.send(`SELECT * FROM bills`)
// });

router.get('/groups', async (req, res) => {
  try {
  const con = await mysql.createConnection(dbConfig);
  const [data] = await con.execute('SELECT * FROM cao_group');
  await con.end();
  
  return res.send(data);
  } catch (err) {
  return res.status(500).send({ err });
  }
  });


  router.post('/my-groups', async (req, res) => {
    if (
    !req.body.name
    ) {
    return res.status(400).send({ err: 'Incorrect data passed' });
    }
    
    try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(
    `INSERT accounts(group_id)
    VALUES ('${req.body.groupId} ${req.body.token}')`,
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
