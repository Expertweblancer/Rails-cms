var projectViewModel = null;
var projectssArray = [];

   function getURLParameter(sParam) {
            var url = window.location.pathname;
            var sPageURL = url.substring(1);
            console.log(sPageURL)

            var sURLVariables = sPageURL.split('/');
            var sURLVariables = sURLVariables[1].split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('*');
                if (sParameterName[0] == sParam)
                {
                    return sParameterName[1];
                }
            }
        }
var id = getURLParameter('id');
console.log(id);


var projectsViewModelOperation = {
    projectViewModel: function () {
        var self = this;
       
        self.Project_ID = ko.observable("");
        self.title = ko.observable("")
        self.description = ko.observable("");




            self.updateProject = function () {
        $.ajax({
            url: mainUrl+'projects/'+id,
            type: "put",
            accept: 'json',
            data: {
                title: self.title(),
                description: self.description()
            } ,
            success:function(data){

                $.gritter.add({
                    title: "Success ! ",
                    text: " your project Successfully updated   ",
                    fade: true,
                    speed: "slow"


                            });

            },
            error: function(){
                             
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
    },


        getdetails: function () {
self.getUser = ko.observable("");

        $.ajax({
            url: mainUrl+'projects/'+id,
            type: "get",
            accept: 'json',
                success: function (data) {
                self.getUser(data);
                details = data.project; 
                projectViewModel.title( details.title) 
                projectViewModel.description( details.description) 

                console.log("details", projectViewModel.title());
            }
        });

    },

    ini: function () {
        projectViewModel = new projectsViewModelOperation.projectViewModel();
        projectsViewModelOperation.getdetails();

        ko.applyBindings(projectViewModel,$('#projectViewModel')[0]);
    },


}

$(document).ready(function () {
    projectsViewModelOperation.ini();



});