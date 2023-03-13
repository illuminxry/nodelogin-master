const { encrypt } = require('caesar-encrypt') ;
const mysql = require("mysql");


const encryptkey = 10;
exports.getRegister = (req, res) => {
      res.render('register');
};
exports.postRegister = (req, res) => {
      const { email, password ,userlevel} = req.body;

      const conn = mysql.createConnection({
            host: 'localhost',
            database: 'nodelogin',
            user: 'root',
            password: ''
      });

      conn.query('SELECT * FROM users where email = ?',[email],function(error,results,fields){
            console.log(results);
            if(results.length > 0){ 
                  res.send("email already taken");
            }
            else{
                  var pw = encrypt(password,encryptkey);
                  var sql = 'INSERT INTO `users` (`email`, `password`,`userlevel`,`shift`) VALUES (?,?,?,?)';
                  var values = [email, pw, userlevel, encryptkey];
                  conn.connect(function(err){
                        conn.query(sql, values, function (err, result){
                              if(err) throw err;
                              console.log("entry added");
                              console.log("User: " + email);
                              console.log("Password: " + password);
                              conn.destroy();
                              res.render('login');
                        })
                  });
            }
      }); 
};

