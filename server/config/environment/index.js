/*
 * All configurations Settings
*/

module.exports = {
	env: 'development',
	port: 9000,
	seedDB: true,
	currentYear: 2017,
	startYear: 2017,
	secret: {
		session: 'vidayasager-secret'
	},
	mongo: {
		uri: 'mongodb://localhost/vidyasagar',
		options: {
			db: {
				safe: true
			}
		}
	},

}
