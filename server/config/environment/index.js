/*
 * All configurations Settings
*/

module.exports = {
	env: 'development',
	port: process.env.PORT || 9000,
	seedDB: true,
	currentYear: 2017,
	startYear: 2017,
	salt: {
		userSaltWorkFactor: 5
	},
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
   // List of user roles - in the hierarchical order
  	userRoles: [
    	{id: 'user', name: 'User'},
    	{id: 'admin', name: 'Admin'}
  	]

}
