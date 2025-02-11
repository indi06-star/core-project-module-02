import mysql2 from "mysql2/promise"
import {config} from "dotenv"
config()

const pool = mysql2.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

pool.getConnection((err) => {
    if (!err) {
       return err ;
    }
    console.log("connected successful !")
  });

export{pool} 