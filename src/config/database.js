// require('dotenv').config({
//   path: process.env.NODE_ENV ? process.env.NODE_ENV.trim() === "test" ? ".env.test" : ".env" : ".env"
// });

module.exports = {
  dialect: 'mysql',
  host:'us-cdbr-east-04.cleardb.com',
  username:'bb9134d35996c9',
  password:'29bb69f0',
  database:'heroku_b8b269d98ae66af',
  define: {
    timestamps: true,
    underscored: true,
  },
};