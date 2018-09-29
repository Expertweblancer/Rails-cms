$(document).ready(function () {
    $("#form-signin").validate({
        rules: {
            email: {required: true, email: true},
            password: {required: true}
        },
        messages: {
            email: {required: "Please enter a valid email address", email: "Please enter a valid email address"},
            password: {required: "Please provide a password"}
        }
    });

});