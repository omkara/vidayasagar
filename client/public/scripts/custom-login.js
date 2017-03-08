vidyaSagar.service('callService', function($http) {
    return {
        getData: function(data, api) {
            // return $http.get('/foos')
            //     .then(function(result) {
            //         return result.data;
            //     });
            return data;
        }
    }
});

vidyaSagar.controller('formController', function($scope) {

    $scope.init = function() {
        $scope.register = true;
        $scope.dis = false;
        $scope.emailErr = true;
        $scope.pswdErr = true;

    }

    $scope.switchRegForm = function switchRegForm() {
        var form = $('.form');
        var cta = $('.cta');
        var login = $('#login').val();
        var passForm = $('#password-form');
        animateForm(form);
        animateForm(cta);
        animateForm(passForm);
        if (login == "Login to account") {
            $('#login').val('Create an account');
        } else {
            $('#login').val('Login to account');
        }
    }

    $scope.switchPassForm = function switchPassForm() {
        $scope.register = false;
        $scope.dis = true;
        var logForm = $('#login-form');
        var passForm = $('#password-form');
        var cta = $('.cta');
        animateForm(logForm);
        animateForm(cta);
        animateForm(passForm);
    }

    $scope.cancelPassForm = function cancelPassForm() {
        $scope.register = true;
        $scope.dis = false;
        var logForm = $('#login-form');
        var passForm = $('#password-form');
        var cta = $('.cta');
        animateForm(logForm);
        animateForm(cta);
        animateForm(passForm);
    }

    function animateForm(value) {
        $(value).animate({
            height: "toggle",
            'padding-top': 'toggle',
            'padding-bottom': 'toggle',
            opacity: "toggle"
        }, "slow");
    }
});

vidyaSagar.controller('loginController', function($scope, $http, callService) {
    $scope.authenticate = function() {
            var data = $scope.loginForm;
            data = JSON.stringify(data);
            var api = "/login"
                // callService.getData(data, api).then(function(data) {
                //     //$scope.data = data;
                //     console.log(data);
                // });
            data = callService.getData(data, api);
            console.log(data);
        },
        $scope.validate = function() {
            var data = $scope.loginForm;
            var email = data.email;
            var password = data.password;
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var pswdRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

            if ((email === null || email === undefined || email == "")) {
                $scope.pswdErr = true;
                $scope.emailErr = false;
            } else if (!re.test(email)) {
                $scope.pswdErr = true;
                $scope.emailErr = false;
            } else if (password === null || password === undefined || password == "") {
                $scope.pswdErr = false;
                $scope.emailErr = true;
            } else if (!pswdRe.test(password)) {
                $scope.pswdErr = false;
                $scope.emailErr = true;
            } else {
                $scope.authenticate();
            }
        }
});

vidyaSagar.controller('registerController', function($scope, $http, callService) {
    $scope.register = function() {
        var data = $scope.regForm;
        data = JSON.stringify(data);
        var api = "/login"
            // callService.getData(data, api).then(function(data) {
            //     //$scope.data = data;
            //     console.log(data);
            // });
        data = callService.getData(data, api);
        console.log(data);
    }
    $scope.validate = function() {
        var data = $scope.regForm;
        var email = data.email;
        var password = data.password;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var pswdRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        if ((email === null || email === undefined || email == "")) {
            $scope.pswdErr = true;
            $scope.emailErr = false;
        } else if (!re.test(email)) {
            $scope.pswdErr = true;
            $scope.emailErr = false;
        } else if (password === null || password === undefined || password == "") {
            $scope.pswdErr = false;
            $scope.emailErr = true;
        } else if (!pswdRe.test(password)) {
            $scope.pswdErr = false;
            $scope.emailErr = true;
        } else {
            $scope.register();
        }

    }
});

vidyaSagar.controller('passwordController', function($scope, $http, callService) {
    $scope.changePassword = function() {
        var data = $scope.pswd;
        data = JSON.stringify(data);
        var api = "/login"
            // callService.getData(data, api).then(function(data) {
            //     //$scope.data = data;
            //     console.log(data);
            // });
        data = callService.getData(data, api);
        console.log(data);
    }

    $scope.validate = function() {
        var data = $scope.pswd;
        var email = data.email;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ((email === null || email === undefined || email == "")) {
            $scope.emailErr = false;
        } else if (!re.test(email)) {
            $scope.emailErr = false;
        } else {
            $scope.changePassword();
        }

    }
});