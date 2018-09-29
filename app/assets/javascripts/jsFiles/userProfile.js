var projectsViewModel = null;

var PAGING_ITEMS = 5;
//https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:1LefuVV2eCnW9VKjJGJzgZWa9vHg7Rc3r1?amount=0
var userInfoViewModelOperation = {
    projectsViewModel: function () {
        var self = this;
        self.projects = ko.observableArray([]);
        self.projects.extend({paged: {pageSize: PAGING_ITEMS, pageGenerator: 'sliding'}});
        self.Project_ID = ko.observable("");
        self.Project_Name = ko.observable("");
        self.Project_Description = ko.observable("");
        self.Project_User = ko.observable("");
        self.Project_Duration = ko.observable("");
        self.Project_Status = ko.observable("");
    },
    userInfoViewModel: function () {
        var self = this;
        self.User_ID = ko.observable("");
        self.User_Email = ko.observable("");
        self.User_First_Name = ko.observable("");
        self.User_Last_Name = ko.observable("");
        self.User_University = ko.observable("");
        self.User_Department = ko.observable("");
        self.User_Interests = ko.observable("");
        self.User_Password = ko.observable("");
        self.User_Password_Confirmation = ko.observable("");
        self.User_Current_Password = ko.observable("");
    },
    ini: function () {
        projectsViewModel = new userInfoViewModelOperation.projectsViewModel();        
        userInfoViewModelOperation.getProjects();
        ko.applyBindings(projectsViewModel,$('#projectsViewModel')[0]);
        
        userInfoViewModel = new userInfoViewModelOperation.userInfoViewModel();        
        ko.applyBindings(userInfoViewModel,$('#userInfoViewModel')[0]);
    },
    getProjects: function () {
         projectsArray = [[1, "project1", "user1", "4 day ago", "Auther"],
            [2, "project2", "user2", "30 day ago", "Member"],
            [3, "project3", "user1", "33 day ago", "<a class='btn btn-success btn-xs'><i class='icon-plus'></i> Join project</a>"]];
        for (var x in projectsArray) {
            row = projectsArray[x];
            projectViewModelItem = new userInfoViewModelOperation.projectsViewModel();
            projectViewModelItem.Project_ID(row[0]);
            projectViewModelItem.Project_Name(row[1]);
            projectViewModelItem.Project_User(row[2]);
            projectViewModelItem.Project_Duration(row[3]);
            projectViewModelItem.Project_Status(row[4]);

            projectsViewModel.projects().push(projectViewModelItem);
        }
        return projectsViewModel.projects();
    }
}

$(document).ready(function () {
    userInfoViewModelOperation.ini();
});