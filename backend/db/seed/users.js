require('dotenv').config()
process.env.DATABASE_URL = 'postgres://postgres@localhost:5432/ppz'
const { query } = require('../');
const faker = require('faker');

const insertUsers = async (count = 10000) => {
  for (let i = 0; i < count; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const q = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
    `
   try {
     await query(q, [username, email, password]);
   } catch (e) {
     console.log(e)
   }
  }
}

insertUsers();