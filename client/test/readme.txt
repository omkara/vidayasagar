ngResource reference.



- method supported by default as per angular documentation. 

{ 
	'get':    {method:'GET'},
  	'save':   {method:'POST'},
  	'query':  {method:'GET', isArray:true},
  	'remove': {method:'DELETE'},  // for Internet Explorer.
  	'delete': {method:'DELETE'} 
};

- What it offers:
		- Support REST call in easier way.
		- We can add custom methods such as UPDATE for HTTP PUT operation or even can override existing methods mentioned above.

- Syntax
$resource(url, [paramDefaults], [actions], options);
	- url : Rest url

	- paramDefaults : Second parameter in $resource is an object, with key:value pairs, used for specifying default values for individual parameters in url (parameters prefixed with : in url). We will discuss more on it in a moment.

	- actions : Third parameter in $resource is an object hash [action object] with declaration of custom actions that should extend the default set of resource actions.

	- options : Fourth parameter is an object that provides possibility to specify some custom settings. In above snippet, we are asking AngularJS not to strip the trailing slashes present at the end of URL (which by default gets removed). It is handy for dealing with Servers who wants trailing slashes to be present in URL.

NOTE: Action parameter deserves special attention. Using action parameter, we have added a custom update method on resource object which on use, will eventually send HTTP PUT request to server. You can do some very useful stuff using action parameter. For example, you can cache certain type of request by providing extra info in action:


Example:

Step 1: Create a User factory.

App.factory('User', ['$resource', function ($resource) {
    //$resource() function returns an object of resource class.
    return $resource(
            'http://localhost:8080/app/user/:id', //url
            {},//parameters
            {
                update: {
                      method: 'PUT' // To send the HTTP Put request when calling this custom update method.
                },
                get: {
                      method: 'GET', cache: true // Override GET to cache the GET request fired using 'get' method.
                }
            }, // actions
            {
                stripTrailingSlashes: false
            } //options
    );
}]);


Step 2: Use User service

$scope.users = User.query(); // gives all users
$scope.user = User.get({id:3}); // get single user with id=3
