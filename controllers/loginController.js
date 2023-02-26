const mysql = require("mysql");

const conn = mysql.createConnection({
      host: 'localhost',
      database: 'nodelogin',
      user: 'root',
      password: ''
});

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = (req, res) => {

    const { username, password } = req.body;

    if (username && password){

      conn.query('SELECT * FROM users WHERE username = `username` AND password = `password`',[username,password],function(error,results,fields){
        if(results.length > 0){
          console.log(username,password);
          res.render('home');
        }
        else{
          res.send('Incorrect Username and/or Password');
          console.log(error);
        }
        res.end();
      });
    }
    else{
      res.send('Please enter a username and password');
      res.end();
    }
};
