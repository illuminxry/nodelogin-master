const mysql = require("mysql");

exports.getHome = (req, res) => {
    res.render('home');
};

exports.postHome = (req, res) => {


    const { firstname, middlename, lastname, birthdate, gender, civilstatus, country, region, province, city, barangay, zipcode, address } = req.body;
    // AKA Sieve of Eratosthenes
    const getPrimes = (min, max) => {
        const result = Array(max + 1)
            .fill(0)
            .map((_, i) => i);
        for (let i = 2; i <= Math.sqrt(max + 1); i++) {
            for (let j = i ** 2; j < max + 1; j += i) delete result[j];
        }
        return Object.values(result.slice(Math.max(min, 2)));
    };

    const getRandNum = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getRandPrime = (min, max) => {
        const primes = getPrimes(min, max);
        return primes[getRandNum(0, primes.length - 1)];
    };

    function encryptMessage(msg) {
        ///Cipher Text initially empty
        let cipher = "";
        for (let i = 0; i < msg.length; i++) {
            // Avoid space to be encrypted
            if (msg[i] != ' ')
                /* applying encryption formula ( a x + b ) mod m
                {here x is msg[i] and m is 26} and added 'A' to
                bring it in range of ascii alphabet[ 65-90 | A-Z ] */
                cipher = cipher + String.fromCharCode((((keya * (msg[i].charCodeAt(0) - 65)) + keyb) % 26) + 65);
            else
                //else simply append space character
                cipher += msg[i];
        }
        return cipher;
    }
    let keya = getRandPrime(0, 25);
    let keyb = Math.floor((Math.random() * 25) + 0);

    let fname = encryptMessage(firstname);
    let mname = encryptMessage(middlename);
    let lname = encryptMessage(lastname);

    const conn = mysql.createConnection({
        host: 'localhost',
        database: 'userlogin',
        user: 'root',
        password: ''
    });

    var sql = 'INSERT INTO `userdetails` (`firstname`,`middlename`,`lastname`,`birthdate`,`gender`,`civilstatus`,`country`,`region`,`province`,`city`,`barangay`,`zipcode`,`address`,`keya`,`keyb`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var values = [fname, mname, lname, birthdate, gender, civilstatus, country, region, province, city, barangay, zipcode, address, keya, keyb];
    conn.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("entry added");
        conn.destroy();
        // res.render('login');
        res.redirect('home');
    })
}
// '${firstname}','${middlename}','${lastname}','${birthdate}','${gender}','${civilstatus}','${country}','${region}','${province}','${city}','${barangay}','${zipcode}','${address}'
