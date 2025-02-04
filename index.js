import mysql from 'mysql2/promise'
import express from 'express'
import {config} from 'dotenv'

config()

const pool = mysql.createPool({
     hostname:process.env.HOSTNAME,
     user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})
const app = express()
app.use(express.json())

// Start the server on port 4000
app.listen(4000, () => {
  console.log('Server is running at http://localhost:4000');
  console.log("Hi..."); 
});

