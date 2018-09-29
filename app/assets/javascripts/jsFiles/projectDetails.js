var projectDetailsViewModel = null;
var projectsDetailsArray = [];
var PAGING_ITEMS = 5;

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

     self.add= function (){
    // Membership.create(user_id => "5" ,project_id =>"9");

        $.ajax({
            url:'http://10.10.10.194:3000/api/v1/memberships',
            type:"Post",
            dataType: 'json',
            data:{
                user_id:"5",
                project_id:"9",
            } ,      
            success:function(data){
            console.log("added!",data);                   
            }
        })
    },   
        membersArray = [{id: "1", img: "img/member1.jpg", name: "Dr. Hebert Mahalkan"},
            {id: "2", img: "img/member1.jpg", name: "Dr. Hebert Mahalkan"},
            {id: "3", img: "img/member1.jpg", name: "Dr. Hebert Mahalkan"}];

        transactionArray = [{id: "1", transaction: "transaction1", date: "1/1/2016", type: "sell", amount_in_BTC: "50$", amount_in_Doller: "50$"},
            {id: "2", transaction: "transaction1", date: "1/1/2016", type: "sell", amount_in_BTC: "50$", amount_in_Doller: "50$"},
            {id: "3", transaction: "transaction1", date: "1/1/2016", type: "sell", amount_in_BTC: "50$", amount_in_Doller: "50$"},
            {id: "4", transaction: "transaction1", date: "1/1/2016", type: "sell", amount_in_BTC: "50$", amount_in_Doller: "50$"}];

        self.Project_ID = ko.observable("1");
        self.Project_Name = ko.observable("Project Name");
        self.Project_User = ko.observable("User 1");
        self.Project_Duration = ko.observable("4 Days ago");
        self.Project_Description = ko.observable("Lorem ipsum dolor set amet lorem ipsum dolor set amet ipsum dolor set amet. Lorem ipsum dolor set amet lorem ipsum dolor set amet ipsum dolor set amet. Lorem ipsum dolor set amet lorem ipsum dolor set amet ipsum dolor set amet, Lorem ipsum dolor set amet lorem ipsum dolor set amet ipsum dolor set amet. Lorem ipsum dolor set amet lorem ipsum dolor set amet ipsum dolor set amet. Lorem ipsum dolor set amet lorem ipsum dolor set amet ipsum dolor set amet");
        self.Request_Amount = ko.observable("20,000");
        self.Fund_Amount = ko.observable("10,000");
        self.Project_Members = ko.observableArray(membersArray);
        self.Item_Transaction = ko.observableArray(transactionArray);
        self.Request_Items = ko.observableArray([]);
        self.Request_Items.extend({paged: {pageSize: PAGING_ITEMS, pageGenerator: 'sliding'}});
        /*-----for request items element array-----*/
        self.Request_Items_ID = ko.observable("");
        self.Request_Items_Title = ko.observable("");
        self.Request_Items_Amount = ko.observable("");
        self.Request_Items_Fullfill = ko.observable("");
        self.Request_Items_Date = ko.observable("");
        self.Request_Items_Transactions = ko.observableArray([]);
        self.Request_Items_Transactions_ID = ko.observable("");
        self.Request_Items_Transactions_Transaction = ko.observable("");
        self.Request_Items_Transactions_Date = ko.observable("");
        self.Request_Items_Transactions_Type = ko.observable("");
        self.Request_Items_Transactions_Amount_In_BTC = ko.observable("");
        self.Request_Items_Transactions_Amount_In_Doller = ko.observable("");

    },
    ini: function () {
        projectDetailsViewModel = new projectsDetailsViewModelOperation.projectDetailsViewModel();
        projectsDetailsViewModelOperation.getItems();
        ko.applyBindings(projectDetailsViewModel, $('#projectDetailsViewModel')[0]);

        buyerModalViewModel = new projectsDetailsViewModelOperation.buyerModalViewModel();
        ko.applyBindings(buyerModalViewModel, $('#smart-modal-buy')[0]);

        sellerModalViewModel = new projectsDetailsViewModelOperation.sellerModalViewModel();
        ko.applyBindings(sellerModalViewModel, $('#smart-modal-sell')[0]);


    },
    getProjectByID: function (id) {
        var row;
        for (var x in projectsDetailsArray) {
            if (projectsDetailsArray[x][0] == id) {
                row = projectsDetailsArray[x];
                break;
            }
        }
        projectDetailsViewModel.Project_ID(id);
        projectDetailsViewModel.Project_Name(row[1]);
        projectDetailsViewModel.Project_Description(row[2]);
    },
    getItems: function () {
        requestItemsArray = [{id: "1", item: "item1", amount: "100$", fullfill: "50$", date: "30/12/2015", transactions: [transactionArray[1], transactionArray[2]]},
            {id: "2", item: "item2", amount: "140$", fullfill: "90$", date: "20/12/2015", transactions: transactionArray},
            {id: "3", item: "item3", amount: "700$", fullfill: "300$", date: "20/2/2015", transactions: ""},
            {id: "4", item: "item4", amount: "300$", fullfill: "100$", date: "30/2/2015", transactions: [transactionArray[1]]}];

        for (var x in requestItemsArray) {
            row = requestItemsArray[x];
            projectDetailsViewModelItem = new projectsDetailsViewModelOperation.projectDetailsViewModel();
            projectDetailsViewModelItem.Request_Items_ID(row.id);
            //console.log("id : " + row.id);
            //console.log("Request_Items_ID : " + projectDetailsViewModelItem.Request_Items_ID());

            projectDetailsViewModelItem.Request_Items_Title(row.item);
            //console.log("item : " + row.item);
            //console.log("Request_Items_Title : " + projectDetailsViewModelItem.Request_Items_Title());

            projectDetailsViewModelItem.Request_Items_Amount(row.amount);
            //console.log("amount : " + row.amount);
            //console.log("Request_Items_amount : " + projectDetailsViewModelItem.Request_Items_Amount());

            projectDetailsViewModelItem.Request_Items_Fullfill(row.fullfill);
            //console.log("fullfill : " + row.fullfill);
            //console.log("Request_Items_Fullfill : " + projectDetailsViewModelItem.Request_Items_Fullfill());

            projectDetailsViewModelItem.Request_Items_Date(row.date);
            //console.log("date : " + row.date);
            //console.log("Request_Items_Date : " + projectDetailsViewModelItem.Request_Items_Date());

            projectDetailsViewModelItem.Request_Items_Transactions([]);
            //console.log("transactions : " + row.transactions);
            //console.log("Request_Items_Transactions : " + projectDetailsViewModelItem.Request_Items_Transactions());
            /*for (var y in row.transactions) {
             rowIn = row.transactions[y];
             projectDetailsViewModel.Request_Items_Transactions_ID(rowIn.id);
             projectDetailsViewModel.Request_Items_Transactions_Title(rowIn.title);
             projectDetailsViewModel.Request_Items_Transactions_Amount(rowIn.amount);
             console.log("**************");
             console.log("**id : "+rowIn.id+ ", title : "+rowIn.title+", amount : "+rowIn.amount);
             console.log(
             "**Request_Items_Transactions_ID : "+projectDetailsViewModel.Request_Items_Transactions_ID()+
             ", Request_Items_Transactions_Title : "+projectDetailsViewModel.Request_Items_Transactions_Title()+
             ", Request_Items_Transactions_Amount : "+projectDetailsViewModel.Request_Items_Transactions_Amount());
             console.log("**************");
             
             projectDetailsViewModel.Request_Items_Transactions().push([
             projectDetailsViewModel.Request_Items_Transactions_ID(),
             projectDetailsViewModel.Request_Items_Transactions_Title(),
             projectDetailsViewModel.Request_Items_Transactions_Amount()
             ]);
             }
             console.log("//////////////////////////");
             console.log("Request_Items_Transactions : "+projectDetailsViewModel.Request_Items_Transactions());
             console.log("//////////////////////////");
             console.log("-----------------------------------------------");
             */
            projectDetailsViewModel.Request_Items().push(projectDetailsViewModelItem);
        }
        return projectDetailsViewModel.Request_Items();
    }
}

function fnFormatDetails(oTable, nTr)
{
    var aData = oTable.fnGetData(nTr);
    var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="width:100%">';
    sOut += '<thead><tr><th style="width:20%">transaction</th><th style="width:20%; text-align: center;">data</th><th style="width:20%; text-align: center;">type</th><th style="width:20%; text-align: center;">amount in BTC </th><th style="width:20%; text-align: center;">amount in $</th><tr/></thead>';

    /*sOut += '<tbody><tr><td>'+projectDetailsViewModel.Request_Items_Transactions_Title()+'</td>'+
     '<td style="text-align: center;">'+projectDetailsViewModel.Request_Items_Transactions_Amount()+'</td><tr/></tbody>';
     */
    sOut += '<tbody><tr><td>transaction11</td><td style="text-align: center;">20/10/2015</td><td style="text-align: center;">sell</td><td style="text-align: center;">100</td><td style="text-align: center;">100$</td><tr/></tbody>';

    sOut += '</table>';
    return sOut;
}

$(document).ready(function () {
    projectsDetailsViewModelOperation.ini();


    /*
     * Insert a 'details' column to the table
     */
    var nCloneTh = document.createElement('th');
    var nCloneTd = document.createElement('td');
    nCloneTd.innerHTML = '<img src="assets/advanced-datatable/examples/examples_support/details_open.png">';
    nCloneTd.className = "center";
    $('#hidden-table-info thead tr').each(function () {
        this.insertBefore(nCloneTh, this.childNodes[0]);
    });
    $('#hidden-table-info tbody tr').each(function () {
        this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
    });
    /*
     * Initialse DataTables, with no sorting on the 'details' column
     */
    var oTable = $('#hidden-table-info').dataTable({
        "sDom": "",
        "aoColumnDefs": [
            {"bSortable": false, "aTargets": [0]}
        ],
        "aaSorting": [[1, 'asc']]
    });
    /* Add event listener for opening and closing details
     * Note that the indicator for showing which row is open is not controlled by DataTables,
     * rather it is done here
     */
    $('#hidden-table-info tbody td img').live('click', function () {
        var nTr = $(this).parents('tr')[0];
        if (oTable.fnIsOpen(nTr))
        {
            /* This row is already open - close it */
            this.src = "assets/advanced-datatable/examples/examples_support/details_open.png";
            oTable.fnClose(nTr);
        } else
        {
            /* Open this row */
            this.src = "assets/advanced-datatable/examples/examples_support/details_close.png";
            oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
        }
    });
});