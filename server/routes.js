/* API's routes */

module.exports = function(app) {
	app.use('/api/students', require('./api/student'))
	app.use('/api/users', require('./api/user'))
	app.use('/api/signup', require('./api/signup'))
}
