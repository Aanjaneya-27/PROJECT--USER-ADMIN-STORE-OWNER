const {pool} = require('../config/database') 


const findUser = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`
    try{
        const {rows} = await pool.query(query, [email])
        return rows[0]
    }catch(error){
        console.error('Error finding user:', error)
    }
}

const createUser = async (userData) => {
  const {name, email, password, address, role} = userData
  const query = `INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING id,name,email,role`

   try{
    const {rows} = await pool.query(query, [name, email, password, address, role])
    return rows[0]
   }catch(error){
    console.error('Error creating user:', error)
   }
}

module.exports = { findUser,createUser } 