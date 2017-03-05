vidyaSagar.controller('formController', function($scope) {

    $scope.init = function() {
        $scope.register = true;
        $scope.dis = false;
    }

    $scope.switchRegForm = function switchRegForm() {
        var form = $('.form');
        var cta = $('.cta');
        var login = $('#login').val();
        var passForm = $('#password-form');
        animateForm(form);
        animateForm(cta);
        animateForm(passForm);
        if (login == "Register here") {
            $('#login').val('Login here');
        } else if( login =="Login here"){
            $('#login').val('Register here');
        }else{
             $('#login').val('Reset Password');
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