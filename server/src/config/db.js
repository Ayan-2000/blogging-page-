import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "my_app",
    password: "ruman@2000"
});

db.connect((err) =>{
    if(err){
        console.log('Error conecting to detabase', err);
    }
    else{
        console.log('Connected to database');
    }
});

export default db;