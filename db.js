const mysql = require("mysql");

const conn = mysql.createConnection({
      host: 'localhost',
      database: 'userlogin',
      user: 'root',
      password: ''
});

// conn.connect(function (err) {
//       var sql = "INSERT INTO `users` (`username`, `password`) VALUES ?";
//       var values = [['haha', '123pw']];
//       if (err) {
//             throw err;
//       }
//       else {
//             conn.query(sql, [values], function (err, result) {
//                   if (err) throw err;
//                   console.log("entry added.")
//             });
//       }
// });