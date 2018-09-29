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
       
        self.email = ko.observable("")
        self.first_name = ko.observable("");
        self.last_name = ko.observable("");
        self.university = ko.observable("");
        self.department = ko.observable("")
        self.interests = ko.observable("");
        self.encrypted_password = ko.observable("");
        self.reset_password_token = ko.observable("");



        self.updateUserProfile = function () {
            $.ajax({
                url: mainUrl+'users/'+id,
                type: "put",
                accept: 'json',
                data: {
                    email: self.email(),
                    first_name: self.first_name(),
                    last_name: self.last_name(),
                    university: self.university(),
                    department: self.department(),
                    interests: self.interests(),
                    encrypted_password :self.encrypted_password(),
                    reset_password_token :self.reset_password_token()
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
    ini: function () {
        projectViewModel = new projectsViewModelOperation.projectViewModel();
        projectsViewModelOperation.getdetails();

        ko.applyBindings(projectViewModel,$('#userInfoViewModel')[0]);
    },

         getdetails: function () {
self.getUser = ko.observable("");

        $.ajax({
            url: mainUrl+'users/'+id,
            type: "get",
            accept: 'json',
                success: function (data) {
                self.getUser(data);
                details = data.user; 
                projectViewModel.email( details.email) 

                projectViewModel.email( details.email) 
                projectViewModel.first_name( details.first_name) 
                projectViewModel.last_name( details.last_name) 
                projectViewModel.university( details.university) 
                projectViewModel.department( details.department) 
                projectViewModel.interests( details.interests) 
                projectViewModel.university( details.university) 

            }
        });

    },

  
}

$(document).ready(function () {
    projectsViewModelOperation.ini();



});