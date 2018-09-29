var userViewModel = null;

var userViewModelOperation = {
    userViewModel: function () {
        var self = this;
        self.email = ko.observable("");
        self.first_name = ko.observable("");
        self.last_name = ko.observable("");
        self.researcher = ko.observable("");
        self.investor = ko.observable("");
        self.encrypted_password = ko.observable("");
        self.reset_password_token = ko.observable("");

        self.postUser = function () {
            if ($("#form-signup").valid()) {

                $.ajax({
                    url: mainUrl + 'users',
                    type: "Post",
                    accept: 'json',
                    data: {
                        email: self.email(),
                        first_name: self.first_name(),
                        last_name: self.last_name(),
                        researcher: self.researcher(),
                        investor: self.investor(),
                        encrypted_password: self.encrypted_password(),
                        reset_password_token: self.reset_password_token(),
                    },
                    success: function (data) {

                        $.gritter.add({
                            title: "Success ! ",
                            text: "  Successfully added ",
                            fade: true,
                            speed: "slow"
                        });
                window.location.assign("http://10.10.10.194:3000/users/sign_in");
                    },
                    error: function () {

                        $.gritter.add({
                            title: "failure ! ",
                            text: " Something terrible happened.",
                            fade: true,
                            speed: "slow",
                            position: 'left'

                        });
                    }
                });
            }
        }

    },
    ini: function () {
        userViewModel = new userViewModelOperation.userViewModel();

        ko.applyBindings(userViewModel, $('#userViewModel')[0]);
    },
}

$(document).ready(function () {
    userViewModelOperation.ini();

    $("#form-signup").validate({
        rules: {
            email: {required: true, email: true},
            first_name: {required: true},
            last_name: {required: true},
            encrypted_password: {required: true},
            reset_password_token: {required: true, equalTo: "#encrypted_password"}
        },
        messages: {
            email: {required: "Please enter a valid email address", email: "Please enter a valid email address"},
            first_name: {required: "Please enter your firstname"},
            last_name: {required: "Please enter your lastname"},
            encrypted_password: {required: "Please provide a password"},
            reset_password_token: {required: "Please provide a password", equalTo: "Please enter the same password as above"}
        }
    });

});

