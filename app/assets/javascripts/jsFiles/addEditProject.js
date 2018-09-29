var projectViewModel = null;
var projectssArray = [];
var projectsViewModelOperation = {
    projectViewModel: function () {
        var self = this;
        projectssArray = [[1, "project1", "littel description about project 1"],
            [2, "project2", "littel description about project 2"],
            [3, "project1", "littel description about project 3"]];
        self.Project_ID = ko.observable("");
        self.Project_Name = ko.observable("");
        self.Project_Description = ko.observable("");
    },
    ini: function () {
        projectViewModel = new projectsViewModelOperation.projectViewModel();
        ko.applyBindings(projectViewModel,$('#projectViewModel')[0]);
    },
    getProjectByID: function (id) {
        //projectViewModel = new projectsViewModelOperation.projectViewModel();
        var row;
        for (var x in projectssArray) {
            if (projectssArray[x][0] == id) {
                row = projectssArray[x];
                break;
            }
        }
        console.log(row);
        projectViewModel.Project_ID(id);
        projectViewModel.Project_Name(row[1]);
        projectViewModel.Project_Description(row[2]);
    },
    addEditProject: function () {

        Project_ID = projectViewModel.Project_ID();
        Project_Name = projectViewModel.Project_Name();
        Project_Description = projectViewModel.Project_Description();
        Project_User = projectViewModel.Project_User();
        Project_Duration = projectViewModel.Project_Duration();
        notify(['success', _tl('success added')]);
        opStatus = true;


    },
}

$(document).ready(function () {
    projectsViewModelOperation.ini();

    /*$(location).attr('href');
    var pathname = window.location.pathname;
    var params = pathname.substr(pathname.lastIndexOf('/') + 1);
    if (params['projectID'] != '' && !isNaN(parseFloat(params['projectID']))) {
        projectsViewModelOperation.getProjectByID(params['projectID']);
    }*/
    
    $("#projectForm").validate({
        rules: {
            Project_Name: {required: true}
        },
        messages: {
            Project_Name: {required: "Please enter a project name"}
        }
    });

});