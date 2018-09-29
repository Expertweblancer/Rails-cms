var projectDetailsViewModel = null;
var projectsDetailsArray = [];
var PAGING_ITEMS = 5;
var responseArr = [];

function getURLParameter(sParam) {
    var url = window.location.pathname;
    var sPageURL = url.substring(1);
    // console.log(sPageURL)

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
//console.log(id);
document.cookie = "project_id=" + id;


function postMember() {

    self.projects = ko.observableArray([]);

    $.ajax({
        type: 'GET',
        url: mainUrl+'projects/' + id,
        success: function (data) {
            self.projects(data)
            // console.log(self.projects());

            var x = [];
            x = self.projects();
            //  console.log(x);

            var y = [];
            y = x.project
            console.log("y", y);

            var z = [];
            z = y.members;
            console.log(z);

            if (z == "") {
                $.ajax({
                    url: mainUrl+'memberships',
                    type: "Post",
                    accept: 'json',
                    data: {
                        user_id: user_id,
                        project_id: project_id
                    },
                    success: function (data) {
                        $.gritter.add({
                            title: "Success ! ",
                            text: "  added   ",
                            fade: true,
                            speed: "slow"


                        });
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
            z.forEach(function (entry) {

                if (entry.id != user_id) {
                    $.ajax({
                        url: mainUrl+'memberships',
                        type: "Post",
                        accept: 'json',
                        data: {
                            user_id: user_id,
                            project_id: project_id
                        },
                        success: function (data) {

                            $.gritter.add({
                                title: "Success ! ",
                                text: "  added   ",
                                fade: true,
                                speed: "slow"


                            });

                        },
                        error: function () {


                        }
                    });
                } else {
                    $.gritter.add({
                        title: "failure ! ",
                        text: "  you are member in this project",
                        fade: true,
                        speed: "slow",
                        position: 'left'

                    });
                }
            });
        }
    });
}

var projectsDetailsViewModelOperation = {
   
    projectDetailsViewModel: function () {
        var self = this;

 
        self.request = ko.observableArray([]);

        self.request_Items = ko.observableArray([]);
        self.request_Items.extend({paged: {pageSize: 3, pageGenerator: 'sliding'}});


    },
    ini: function () {
        projectDetailsViewModel = new projectsDetailsViewModelOperation.projectDetailsViewModel();
        projectsDetailsViewModelOperation.getProjectDetails();
        projectsDetailsViewModelOperation.getRequestAmount();
        projectsDetailsViewModelOperation.getFundAmount();
        projectsDetailsViewModelOperation.getRequest();
     
        ko.applyBindings(projectDetailsViewModel, $('#projectDetailsViewModel')[0]);

    },

    getRequest: function () {

  $.ajax({
            type: 'GET',
            url:projectResearcherUrl + project_id + '/' + user_id,
            success: function (data) {
                projectDetailsViewModel.request_Items(data);
             //   console.log(self.Activities());
            }
        });

    },
    requestViewModel: function () {
        var self = this;

        self.request_Items_itemName = ko.observable("");
        self.request_Items_priceUSD = ko.observable("");
        self.request_Items_filledAmountUSD = ko.observable("");
        self.request_Items_requestDate = ko.observable("");
        self.request_Items_FullFill = ko.observableArray([]);

        self.fullfill = ko.observableArray([]);

    },
    transactionViewModel: function () {
        var self = this;

        self.transation_Items = ko.observableArray([]);

        self.fullFill_Items_fillID = ko.observable("");
        self.fullFill_Items_fillDate = ko.observable("");
        self.fullFill_Items_fullFillType = ko.observable("");
        self.fullFill_Items_fillAmount = ko.observable("");

    },
    getRequestAmount: function () {

        self.request = ko.observableArray([]);
        self.requestLength = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: projectResearcherUrl + project_id + '/' + user_id,
            success: function (data) {
                self.request(data);
                console.log("request", self.request());

                var length = self.request().length;
                self.requestLength.push(length);
                //console.log("self",self.requestLength())  
            }
        });

    },
    getFundAmount: function () {

        self.memberships = ko.observableArray([]);
        self.FundLength = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: mainUrl+'memberships',
            success: function (data) {
                var x = [];
                x = data.memberships;

                x.forEach(function (entry) {
                    if ((entry.user_id == user_id) && (entry.project_id = project_id)) {
                        self.memberships.push(entry);

                    }
                });
                var length = self.memberships().length;
                self.FundLength.push(length);
                //console.log("self",self.FundLength())  


            }
        });

    },
    getProjectDetails: function () {
        self.projects = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: mainUrl+'projects/' + id,
            success: function (data) {
                self.projects(data);
                //console.log("details", self.projects());
            }
        });

    },
  }

$(document).ready(function () {
    projectsDetailsViewModelOperation.ini();


});