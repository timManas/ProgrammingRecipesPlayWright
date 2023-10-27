import * as dotenv from 'dotenv'
dotenv.config() // WTF ...why do we need this here ?

const adminDetails = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASSWORD,
}

export { adminDetails }
