const mysql = require("mysql");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
});
pool.getConnection(function (err, connection) {
    console.log("database connected");
});
let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment, 
    user_name varchar(255) not null, 
    user_email varchar(255) not null,  
    user_password varchar(255) not null, 
    PRIMARY KEY(user_id)
    )`;

    let profile = `CREATE TABLE IF NOT EXISTS profile(
        user_profile_id INT AUTO_INCREMENT,
        user_id INT NOT NULL,
        first_name VARCHAR (255) NOT NULL, 
        last_name VARCHAR (255) NOT NULL,
        PRIMARY KEY ( user_profile_id ),
        FOREIGN KEY (user_id)REFERENCES registration(user_id)
    )`;

pool.query(registration, (err, results) => {
    if (err) throw err;
    console.log("registrtion table created");
});

pool.query(profile, (err, results) => {
    if (err) throw err;
    console.log("profile, table created");
});

let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(255) not null,
    question_description varchar(255) not null,
    question_code_block varchar(255) not null,
    tags varchar(255) not null,
    user_id int not null,        
    PRIMARY KEY (question_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
  )`;

pool.query(question, (err, results2) => {
    if (err) throw err;
    console.log("question, table created");
});  

let answer = `CREATE TABLE IF NOT EXISTS answer (
    answer_id INT AUTO_INCREMENT,
    answer_text VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)
    )`;

pool.query(answer, (err, results2) => {
    if (err) throw err;
    console.log("answer, table created");
});

module.exports=pool;
