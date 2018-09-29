var projectDetailsViewModel = null;
var projectsDetailsArray = [];
var PAGING_ITEMS = 5;


//get id from url
function getURLParameter(sParam) {
    var url = window.location.pathname;
    var sPageURL = url.substring(1);
    //  console.log(sPageURL)

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
document.cookie = "project_id=" + id;

function postInvestor() {


    self.projects = ko.observableArray([]);

    $.ajax({
        type: 'GET',
        url: mainUrl+'projects/' + id,
        success: function (data) {
            self.projects(data)
            console.log(self.projects());

            var x = [];
            x = self.projects();
            console.log(x);

            var y = [];
            y = x.project
            console.log("y", y);

            var z = [];
            z = y.investors;
            console.log(z);

            if (z == "") {
                $.ajax({
                    url: mainUrl+'investments',
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
                        url: mainUrl+'investments',
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
                        text: "  you are investor in this project",
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
    buyerModalViewModel: function () {
        var self = this;
    },
    sellerModalViewModel: function () {
        var self = this;
    },
    projectDetailsViewModel: function () {
        var self = this;

        self.openBuyModal = function () {
            $("#smart-modal-buy").addClass("smartforms-modal-visible");
            $("body").addClass("smartforms-modal-scroll");
        }
        self.openSellModal = function () {
            $("#smart-modal-sell").addClass("smartforms-modal-visible");
            $("body").addClass("smartforms-modal-scroll");
        }

        self.request = ko.observableArray([]);

        self.request_Items = ko.observableArray([]);
        self.request_Items.extend({paged: {pageSize: PAGING_ITEMS, pageGenerator: 'sliding'}});
        self.testarray = ko.observableArray([]);
        self.testarray.extend({paged: {pageSize: PAGING_ITEMS, pageGenerator: 'sliding'}});
        
    },
    getRequest: function () {

      
     $.ajax({
            type: 'GET',
            url: projectResearcherUrl + project_id + '/' + user_id,
            success: function (data) {
                projectDetailsViewModel.request_Items(data);
             //   console.log(self.Activities());
            }
        });
       /* $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/JavaVersion/rest/projectResearcher/2/-1',
            success: function (data) {
                projectDetailsViewModel.request(data);

                for (var x in data) {
                    row = data[x];
                    requestViewModelItem = new projectsDetailsViewModelOperation.requestViewModel();
                    requestViewModelItem.request_Items_itemName(row.itemName);
                    requestViewModelItem.request_Items_priceUSD(row.priceUSD);
                    requestViewModelItem.request_Items_filledAmountUSD(row.filledAmountUSD);
                    requestViewModelItem.request_Items_requestDate(row.requestDate);
                    requestViewModelItem.fullfill(row.fullFills);
                    /*   var array1 = [];
                     array1 = projectDetailsViewModel.request();
                     array1.forEach(function (entry) {
                     
                     requestViewModelItem.fullfill.push(entry.fullFills)
                     
                     });
                     
                     for (var y in requestViewModelItem.fullfill()) {
                     // data = projectDetailsViewModel.request();
                     transactionRow = requestViewModelItem.fullfill()[y];
                     
                     transactionViewModelItem = new projectsDetailsViewModelOperation.transactionViewModel();
                     transactionViewModelItem.fullFill_Items_fillID(transactionRow.fillID);
                     transactionViewModelItem.fullFill_Items_fillDate(transactionRow.fillDate);
                     transactionViewModelItem.fullFill_Items_fullFillType(transactionRow.fullFillType);
                     transactionViewModelItem.fullFill_Items_fillAmount(transactionRow.fillAmount);
                     transactionViewModelItem.transation_Items.push(transactionViewModelItem);
                     
                     }
                    projectDetailsViewModel.request_Items.push(requestViewModelItem);

                    projectDetailsViewModel.testarray([
                        {Heading: projectDetailsViewModel.request_Items(), Value: requestViewModelItem.fullfill()}

                    ]);
                   //console.log("testarray", projectDetailsViewModel.testarray());

                }
                return projectDetailsViewModel.request_Items();

            }
        });*/

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
    ini: function () {
        projectDetailsViewModel = new projectsDetailsViewModelOperation.projectDetailsViewModel();
        projectsDetailsViewModelOperation.getProjectDetails();
        projectsDetailsViewModelOperation.getRequestAmount();
        projectsDetailsViewModelOperation.getFundAmount();
        projectsDetailsViewModelOperation.getRequest();
      //  projectsDetailsViewModelOperation.accordion();

        ko.applyBindings(projectDetailsViewModel, $('#projectDetailsViewModel')[0]);

        buyerModalViewModel = new projectsDetailsViewModelOperation.buyerModalViewModel();
        ko.applyBindings(buyerModalViewModel, $('#smart-modal-buy')[0]);

        sellerModalViewModel = new projectsDetailsViewModelOperation.sellerModalViewModel();
        ko.applyBindings(sellerModalViewModel, $('#smart-modal-sell')[0]);


    },
    accordion: function () {


        ko.bindingHandlers.accordion = {
            init: function (element, valueAccessor) {

                // Our accordion options
                var options = {
                    collapsible: true,
                    active: false,
                    animate: "easeOutQuint",
                    heightStyle: "content"
                };

                // Instantiate the accordion
                $(element).accordion(options);

                // Add callback for deletion.. note the alert
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    $(element).accordion("destroy");
                    alert("Accordion deleted via custom binding");
                });
            },
        };
    },
    getFundAmount: function () {

        self.investments = ko.observableArray([]);
        self.FundLength = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: mainUrl+'investments',
            success: function (data) {
                var x = [];
                x = data.investments;

                x.forEach(function (entry) {
                    if ((entry.user_id == user_id) && (entry.project_id = project_id)) {
                        self.investments.push(entry);

                    }
                });
                var length = self.investments().length;
                self.FundLength.push(length);
                // console.log("self",self.FundLength())  


            }
        });
    },
    getRequestAmount: function () {

        self.request = ko.observableArray([]);
        self.requestLength = ko.observableArray([]);

        $.ajax({
            type: 'GET',
            url: projectResearcherUrl + project_id + '/' + user_id,
            success: function (data) {
                self.request(data);
                // console.log("request", self.request());

                var length = self.request().length;
                self.requestLength.push(length);
                //   console.log("self",self.requestLength())  
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
                // console.log("details", self.projects());
            }
        });

    },
}

$(document).ready(function () {
    projectsDetailsViewModelOperation.ini();



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


