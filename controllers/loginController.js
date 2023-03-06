const { decrypt } = require('caesar-encrypt');
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: 'localhost',
  database: 'userlogin',
  user: 'root',
  password: ''
});
const shiftkey = 10;

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {

  const { email, password } = req.body;

  if (email && password) {

    conn.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
      var decryptedpw = decrypt(results[0].password, shiftkey);
      if (results.length > 0 && decryptedpw === password) {

        console.log("user email->" + email," user password-> " + decryptedpw);

        res.render('home');
      }
      else {
        res.send('Incorrect Email and/or Password');
        console.log(error);
      }
      res.end();
    });
  }
  else {
    res.send('Please enter a Email and password');
    res.end();
  }
};
