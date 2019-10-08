const routes = require('next-routes')

module.exports = routes()
  .add('home', '/', '/')
  .add('login', '/auth/login', 'auth/login')
  .add('register', '/auth/register', 'auth/register')
  // routes for admin
  .add('admin', 'admin', 'admin/index')
