const { encrypt } = require('caesar-encrypt') ;
const mysql = require("mysql");

exports.getRegister = (req, res) => {
      res.render('register');
};
exports.postRegister = (req, res) => {
      let shift = Math.floor((Math.random() * 26) + 1);
      const { email, password ,userlevel} = req.body;

      const conn = mysql.createConnection({
            host: 'localhost',
            database: 'userlogin',
            user: 'root',
            password: ''
      });

      conn.query('SELECT * FROM users where email = ?',[email],function(error,results,fields){
            if(results.length > 0){ 
                  res.send("email already taken");
            }
            else{
                  var pw = encrypt(password,shift);
                  var sql = 'INSERT INTO `users` (`email`, `password`,`userlevel`,`shift`) VALUES (?,?,?,?)';
                  var values = [email, pw, userlevel, shift];
                  conn.connect(function(err){
                        conn.query(sql, values, function (err, result){
                              if(err) throw err;
                              console.log("entry added");
                              console.log("User: " + email);
                              console.log("Password: " + password);
                              conn.destroy();
                              // res.render('login');
                              res.redirect('login');
                        })
                  });
            }
      }); 
};

