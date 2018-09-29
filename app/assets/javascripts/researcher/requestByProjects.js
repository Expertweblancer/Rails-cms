var researchViewModel = null;

function validateForm() {

    $("#authorizeForm").validate({
        rules: {
            Login_ID: {required: true},
            Transaction_Key: {required: true},
        },
        messages: {
            Login_ID: {required: "Please enter Login ID"},
            Transaction_Key: {required: 'Transaction Key'},
        }
    });

    $('#SetReceivePayment').on('click', function (e) {
        if (true) {
            researchViewModel.signIn(false);
            researchViewModel.setSuccess(true);
            $('#add').removeAttr("disabled");
        } else {
            researchViewModel.signIn(true);
            researchViewModel.setSuccess(false);
            $('#add').attr("disabled", "disabled");
        }
    });
}
var requestsViewModelOperation = {
    researchViewModel: function () {
        var self = this;

        projects_array = [
            {key: '', value: "--select project--"},
            {key: '1', value: "project1"},
            {key: '2', value: "project2"},
            {key: '3', value: "project3"},
            {key: '4', value: "project4"},
            {key: '5', value: "project5"}];

        /*form binds*/
        self.Item_Name = ko.observable("");
        self.Item_Price = ko.observable("");
        self.Merchant_Name = ko.observable("");
        self.Project_Select_ID = ko.observable("");
        self.Project_Select = ko.observableArray(projects_array);
        self.Source = ko.observable("");
        self.Note = ko.observable("");
        self.Login_ID = ko.observable("");
        self.Transaction_Key = ko.observable("");

        self.signIn = ko.observable(true);
        self.setSuccess = ko.observable(false);
    },
    ini: function () {
        researchViewModel = new requestsViewModelOperation.researchViewModel();
        ko.applyBindings(researchViewModel, $('#researchViewModel')[0]);
    },
}

$(document).ready(function () {
    requestsViewModelOperation.ini();

    $("#researcherForm").validate({
        rules: {
            Item_Name: {required: true},
            Project_Select: {required: true},
            Item_Price: {required: true, number: true},
            Merchant_Name: {required: true},
            Login_ID: {required: true},
            Transaction_Key: {required: true}
            Source: {required: true}
            Note: {required: true}
        },
        messages: {
            Item_Name: {required: "Please enter a username"},
            Project_Select: {required: 'Please select one of the projects'},
            Item_Price: {required: 'Please enter item price', number: 'Please enter a valid price number.'},
            Merchant_Name: {required: 'Please enter merchant name'},
            Login_ID: {required: 'Please enter your payment login ID'},
            Transaction_Key: {required: 'Please enter your payment transaction key'}
            Source: {required: 'Please enter your source'}
            Note: {required: 'Please enter your note'}
        }
    });

});