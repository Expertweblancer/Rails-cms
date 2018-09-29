var invetorsViewModel = null;
var buyerModalViewModel = null;
var sellerModalViewModel = null;

var PAGING_ITEMS = 5;
//https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:1LefuVV2eCnW9VKjJGJzgZWa9vHg7Rc3r1?amount=0
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
        self.Item_Price = ko.observable("");
        self.Item_Project = ko.observable("");

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
        items_array = [
            {item: 'Item1', amount: "100", project: "project 1"},
            {item: 'Item2', amount: "95", project: "project 2"},
            {item: 'Item3', amount: "41", project: "project 3"},
            {item: 'Item4', amount: "332", project: "project 4"},
            {item: 'Item5', amount: "5", project: "project 5"},
            {item: 'Item6', amount: "5622", project: "project 6"}];

        for (var x in items_array) {
            row = items_array[x];
            invetorsViewModelItem = new requestsViewModelOperation.invetorsViewModel();
            invetorsViewModelItem.Item_Name(row.item);
            invetorsViewModelItem.Item_Price(row.amount);
            invetorsViewModelItem.Item_Project(row.project);

            invetorsViewModel.items().push(invetorsViewModelItem);
        }
        return invetorsViewModel.items();
    }
}

$(document).ready(function () {
    requestsViewModelOperation.ini();
});