const db_link = process.env.DB;
const JWT_KEY=process.env.JWT;
let SK = process.env.SK;

let user = process.env.user;
let pass = process.env.UserPass

module.exports = {db_link, JWT_KEY, SK, user, pass} ;