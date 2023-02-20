const mysql = require("mysql");

const conn = mysql.createConnection({
      host: 'localhost',
      database: 'nodelogin',
      user: 'root',
      password: ''
});

exports.getRegister = (req, res) => {
      res.render('register');
};
exports.postRegister = (req, res) => {
      const { username, password } = req.body;
      conn.query('SELECT * FROM users where username = `username`',[username],function(error,results,fields){
            if(results.length < 0){
                  res.send("Username already taken");
            }
            else{
                  var sql = 'INSERT INTO `users` (`username`, `password`) VALUES (?,?)';
                  var values = [username, password];
                  conn.connect(function(err){
                        conn.query(sql, values, function (err, result){
                              if(err) throw err;
                              console.log("entry added");
                              conn.destroy();
                              res.render('home');
                        })
                  });
            }
      }); 
};
// exports.postRegister = (req, res) => {
//       const { username, password } = req.body;
//       if (username){
//             var sql = "INSERT INTO `users` (`username`, `password`) VALUES ?";
//             var values = [username,password]; 
//             conn.query('SELECT * FROM users WHERE username = `username`',[username],function(error,results,fields){
//               if(results.length > 0){
//                   res.send('Username already taken');
//                   console.log("username already taken");
//               }
//               else{
//                 conn.query(sql,[values],function(err,result){
//                   if (err) {
//                         throw err;
                        
//                   } else {
//                         console.log("record inserted" + result.affectedRows);
//                   }
//                 });
//               }
//               res.end();
//             });
//           }
//           else{
//             res.send('Please enter a username and password');
//             res.end();
//           }
// };
