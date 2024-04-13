/*connect without sequelize 
const { Pool } = require('pg'); 
const pool = new Pool({
    user:'postgres',
	password: '123456',
	host: 'localhost',
	port: 5432,
	database:'nodeDB',
    max: 20, // Maximum number of clients in the pool 
   idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed }); 
})
async function connectToDB() {
    try {
        const client = await pool.connect();
        console.log("Connected to database");
        return client;
    } catch (err) {
        console.error("Error connecting to database:", err);
        throw err; // Rethrow the error to handle it in the caller function
    }
}

async function query(query,params){
    try {
        // const client = await connectToDB();
        const result = await pool.query(query,params);
        // client.release(); 
        return result.rows;
    } catch (err) {
        console.error("Error executing query:", err);
        throw err; 
    }
}

module.exports={
    query,
    connectToDB,
    pool
}

*/

//connect with sequelize 

const Sequelize = require('sequelize');

const connectionString = 'postgres://postgres:123456@localhost/nodeDB';

const db = new Sequelize(connectionString, {
  dialect: 'postgres'
});

module.exports = db;

