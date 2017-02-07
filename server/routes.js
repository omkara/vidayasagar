/* API's routes */

module.exports = function(app) {
	app.use('/api/students', require('./api/student'))
}
