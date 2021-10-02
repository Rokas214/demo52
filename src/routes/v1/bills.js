const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtSecret } = require('../../config');

const router = express.Router();


const { isLoggedIn } = require('../../middleware');

router.get('/groupbills', isLoggedIn ,async (req, res) => {
    
    try {
      
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute('SELECT * FROM bills');
    await con.end();
    
    return res.send(data);
    } catch (err) {
    return res.status(500).send({ err });
    }
    });
  
  
  router.post('/groupbills', isLoggedIn ,async (req, res) => {

      if (
      !req.body.description || !req.body.amount
      ) {
      return res.status(400).send({ err: 'Incorrect data passed' });
      }
      
      try {
      const con = await mysql.createConnection(dbConfig);
      const [data] = await con.execute(
      `INSERT bills(description,amount)
      VALUES ('${req.body.description}', '${req.body.amount}')`,
      );
      alert("Successfuly added")
      await con.end();
      
      return res.send(data);
      } catch (err) {
      return res.status(500).send({ err: "Please try again" });
      }
    });
  



module.exports = router;
