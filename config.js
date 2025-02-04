import mysql2 from "mysql2/promise"
import {config} from "dotenv"
config()

const pool = mysql2.createPool({
    hostname:process.env.HOSTNAME,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

export{pool}