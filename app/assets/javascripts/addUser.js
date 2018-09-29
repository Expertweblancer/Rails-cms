var fourmViewModel = null;

function fourm() {
    var self = this;

    self.email = ko.observable("");
    self.first_name = ko.observable("");
    self.last_name = ko.observable("");
    self.researcher = ko.observable("");
    self.investor = ko.observable("");
    self.encrypted_password = ko.observable("");
    self.encrypted_password = ko.observable("");

    self.postUsers = function () {
        $.ajax({
            url: mainUrl+'users',
            type: "Post",
            accept: 'json',
            data: {
                email: self.email(),
                first_name:self.first_name(),
                last_name: self.last_name(),
                researcher: self.researcher(),
                investor: self.investor(),
                encrypted_password: self.encrypted_password(),
                encrypted_password: self.encrypted_password()
            }
        });
    }
}
fourmViewModel = new fourm();
ko.applyBindings(fourmViewModel); 