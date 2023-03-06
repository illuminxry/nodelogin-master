const mysql = require("mysql");

const conn = mysql.createConnection({
      host: 'localhost',
      database: 'userlogin',
      user: 'root',
      password: ''
});

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {

    const { email, password } = req.body;

    if (email && password){

      conn.query('SELECT * FROM users WHERE email = ? AND password = ?',[email,password],function(error,results,fields){
        if(results.length > 0){
          console.log(email,password);
          res.render('home');
        }
        else{
          res.send('Incorrect Email and/or Password');
          console.log(error);
        }
        res.end();
      });
    }
    else{
      res.send('Please enter a Email and password');
      res.end();
    }
};
