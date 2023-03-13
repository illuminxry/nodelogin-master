const { decrypt } = require('caesar-encrypt'); 
//import caesar-encrypt
const mysql = require("mysql");

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  const conn = mysql.createConnection({
    host: 'localhost',
    database: 'userlogin',
    user: 'root',
    password: ''
  });
  if (email && password) {

    conn.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
      var decryptedpw = decrypt(results[0].password, results[0].shift);

      if (results.length > 0 && decryptedpw === password) {
        console.log("logged in as user email-> " + email,", user password-> " 
        + decryptedpw , ", user encrypted pw -> " + results[0].password);
        
        res.redirect('home');
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
