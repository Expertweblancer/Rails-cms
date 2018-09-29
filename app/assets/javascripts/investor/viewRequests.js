var invetorsViewModel = null;
var buyerModalViewModel = null;
var sellerModalViewModel = null;

var PAGING_ITEMS = 5;
var requestsViewModelOperation = {
    buyerModalViewModel: function () {
        var self = this;
    },
    sellerModalViewModel: function () {
        var self = this;
    },
    invetorsViewModel: function () {
        var self = this;
        self.items = ko.observableArray([]);
        self.items.extend({paged: {pageSize: PAGING_ITEMS, pageGenerator: 'sliding'}});

        self.openBuyModal = function () {
            $("#smart-modal-buy").addClass("smartforms-modal-visible");
            $("body").addClass("smartforms-modal-scroll");
        }
        self.openSellModal = function () {
            $("#smart-modal-sell").addClass("smartforms-modal-visible");
            $("body").addClass("smartforms-modal-scroll");
        }
        self.Item_Name = ko.observable("");
        self.Project_Name = ko.observable("");
        self.Item_Price = ko.observable("");
    },
    ini: function () {
        invetorsViewModel = new requestsViewModelOperation.invetorsViewModel();
        requestsViewModelOperation.getItems();
        ko.applyBindings(invetorsViewModel, $('#investoresViewModel')[0]);

        buyerModalViewModel = new requestsViewModelOperation.buyerModalViewModel();
        ko.applyBindings(buyerModalViewModel, $('#smart-modal-buy')[0]);

        sellerModalViewModel = new requestsViewModelOperation.sellerModalViewModel();
        ko.applyBindings(sellerModalViewModel, $('#smart-modal-sell')[0]);
    },
    getItems: function () {

        $.ajax({
            type: 'GET',
            url: requsetURL,
            dataType: 'json',
            crossDomain: true,
            success: function (data) {

                for (var x in data) {
                    row = data[x];
                    invetorsViewModelItem = new requestsViewModelOperation.invetorsViewModel();
                    invetorsViewModelItem.Item_Name(row.ItemName);
                    invetorsViewModelItem.Project_Name(row.projectID);
                    invetorsViewModelItem.Item_Price(row.PriceUSD);

                    invetorsViewModel.items.push(invetorsViewModelItem);
                    //console.log(invetorsViewModel.items());

                }
                return invetorsViewModel.items();
            }
        });
    }
}

$(document).ready(function () {
    requestsViewModelOperation.ini();

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