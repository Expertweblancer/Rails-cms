var projectsViewModel = null;
var PAGING_ITEMS = 5;

var projectsViewModelOperation = {
    projectsViewModel: function () {
        var self = this;

        self.projects = ko.observableArray([]);
        self.projects.extend({paged: {pageSize: PAGING_ITEMS, pageGenerator: 'sliding'}});
        self.Project_ID = ko.observable("");
        self.Project_Name = ko.observable("");
        self.Project_User = ko.observableArray([]);
        self.Project_Duration = ko.observable("");

    },
    ini: function () {
        projectsViewModel = new projectsViewModelOperation.projectsViewModel();
        projectsViewModelOperation.getProjects();
        ko.applyBindings(projectsViewModel, $('#projectsViewModel')[0]);
    },
    getProjects: function () {

        $.ajax({
            type: 'GET',
            url: mainUrl +'projects',
            success: function (data) {

                for (var x in data.projects) {
                    row = data.projects[x];
                    projectViewModelItem = new projectsViewModelOperation.projectsViewModel();
                    projectViewModelItem.Project_ID(row['id']);
                    projectViewModelItem.Project_Name(row.title);
                    projectViewModelItem.Project_User(row.authors);
                    projectViewModelItem.Project_Duration(row.created_at);
                    projectsViewModel.projects.push(projectViewModelItem);
                }
                return projectsViewModel.projects();
            }
        });
    }
}

$(document).ready(function () {
    projectsViewModelOperation.ini();

    
    $("#buy").validate({
        rules: {
            Wallet_GUID: {required: true},
            Wallet_Pass: {required: true},
            Amount_BTC: {required: true, number: true}

        },
        messages: {
            Wallet_GUID: {required: "Please enter Wallet GUID"},
            Wallet_Pass: {required: 'Please enter your Wallet Pass'},
            Amount_BTC: {required: 'Please enter Amount BTC '}

        }
    });

    $("#sell").validate({
        rules: {
            Sell_Amount: {required: true},
            Your_Account: {required: true},
        },
        messages: {
            Sell_Amount: {required: "Please enter Sell Amount"},
            Your_Account: {required: 'Please enter Your Account'}

        }
    });
});