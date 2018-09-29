var projectsViewModel = null;

var PAGING_ITEMS = 5;
//https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:1LefuVV2eCnW9VKjJGJzgZWa9vHg7Rc3r1?amount=0
var projectsViewModelOperation = {
    projectsViewModel: function () {
        var self = this;
        self.projects = ko.observableArray([]);
        self.projects.extend({paged: {pageSize: PAGING_ITEMS, pageGenerator: 'sliding'}});
        self.Project_ID = ko.observable("");
        self.Project_Name = ko.observable("");
        self.Project_Description = ko.observable("");
        self.Project_User = ko.observable("");
        self.Project_Duration = ko.observable("");
    },
    ini: function () {
        projectsViewModel = new projectsViewModelOperation.projectsViewModel();        
        projectsViewModelOperation.getProjects();
        ko.applyBindings(projectsViewModel,$('#projectsViewModel')[0]);
    },
    getProjects: function () {
        
         projectsArray = [[1, "project1", "user1", "4 day ago", "littel description about project 1"],
            [2, "project2", "user2", "30 day ago", "littel description about project 2"],
            [3, "project3", "user1", "33 day ago", "littel description about project 3"]];
        
        for (var x in projectsArray) {
            row = projectsArray[x];
            projectViewModelItem = new projectsViewModelOperation.projectsViewModel();
            projectViewModelItem.Project_ID(row[0]);
            projectViewModelItem.Project_Name(row[1]);
            projectViewModelItem.Project_User(row[2]);
            projectViewModelItem.Project_Duration(row[3]);
            projectViewModelItem.Project_Description(row[4]);

            projectsViewModel.projects().push(projectViewModelItem);
        }
        return projectsViewModel.projects();
    }
}

$(document).ready(function () {
    projectsViewModelOperation.ini();
});