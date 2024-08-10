import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config(
    {
        path:'./.env'
    } 
)

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const connect = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

connect.connect((error)=>{
    if(error) throw error;
    console.log("connected to database")
})


export default connect;