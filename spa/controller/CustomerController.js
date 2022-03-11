/*customer save*/
let cusId = $("#inputI").val();
let name = $("#inputNam").val();
let address = $("#inputAddres").val();
let salary = $("#inputSalar").val();
function CustomerSave() {
    let cusId = $("#inputI").val();
    let name = $("#inputNam").val();
    let address = $("#inputAddres").val();
    let salary = $("#inputSalar").val();
        var CustomerObject = {
            cusID: cusId,
            name: name,
            address: address,
            salary: salary
        };
        customerTable.push(CustomerObject);
        cmbCustomers("<option>"+cusId+"</option>");
}

function loadAllCustomer() {
    $("#tblCustomer").empty();
    for (var i of customerTable) {
        let row = `<tr><td>${i.cusID}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        $("#tblCustomer").append(row);
    }
}

$("#btnCustomerSave").click(function () {
    CustomerSave();
    loadAllCustomer();
    checkCustomerIfValid();
    clearCustomerAll();
    deleteCustomer();
});

function clearCustomerAll() {
    $('#inputI,#inputNam,#inputAddres,#inputSalar').val("");
    $('#inputI').focus();
    $("#btnCustomerSave").attr('disabled', true);
    loadAllCustomer();
}

/*validation*/

var cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
var cusNameRegEx = /^[A-z ]{5,20}$/;
var cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
var cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#inputI,#inputNam,#inputAddres,#inputSalar').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#inputI,#inputNam,#inputAddres,#inputSalar').on('blur', function () {
    formValid();
});

$("#inputI").on('keyup', function (eventOb) {
    setCustomerButton();
    if (eventOb.key == "Enter") {
        checkCustomerIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#inputI").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#inputI").val(srcCustomer.getCustomerID());
        $("#inputNam").val(srcCustomer.getCustomerName());
        $("#inputAddres").val(srcCustomer.getCustomerAddress());
        $("#inputSalar").val(srcCustomer.getCustomerSalary());
    }


});

$("#inputNam").on('keyup', function (eventOb) {
    setCustomerButton();
    if (eventOb.key == "Enter") {
        checkCustomerIfValid();
    }
});

$("#inputAddres").on('keyup', function (eventOb) {
    setCustomerButton();
    if (eventOb.key == "Enter") {
        checkCustomerIfValid();
    }
});

$("#inputSalar").on('keyup', function (eventOb) {
    setCustomerButton();
    if (eventOb.key == "Enter") {
        checkCustomerIfValid();
    }
});

$("#btnCustomerSave").attr('disabled', true);

function formCustomerValid() {
    var cusID = $("#inputI").val();
    $("#inputI").css('border', '2px solid green');
    $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#inputNam").val();
        if (cusNameRegEx.test(cusName)) {
            $("#inputNam").css('border', '2px solid green');
            $("#lblcusname").text("");
            var cusAddress = $("#inputAddres").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#inputSalar").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#inputAddres").css('border', '2px solid green');
                $("#lblcusaddress").text("");
                if (resp) {
                    $("#inputSalar").css('border', '2px solid green');
                    $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#inputSalar").css('border', '2px solid red');
                    $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#inputAddres").css('border', '2px solid red');
                $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#inputNam").css('border', '2px solid red');
            $("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#inputI").css('border', '2px solid red');
        $("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkCustomerIfValid() {
    var cusID = $("#inputI").val();
    if (cusIDRegEx.test(cusID)) {
        $("#inputNam").focus();
        var cusName = $("#inputNam").val();
        if (cusNameRegEx.test(cusName)) {
            $("#inputAddres").focus();
            var cusAddress = $("#inputAddres").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#inputSalar").focus();
                var cusSalary = $("#inputSalar").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        CustomerSave;
                        loadAllCustomer();
                        clearAll();
                    }
                } else {
                    $("#inputSalar").focus();
                }
            } else {
                $("#inputAddres").focus();
            }
        } else {
            $("#inputNam").focus();
        }
    } else {
        $("#inputI").focus();
    }
}

function setCustomerButton() {
    let b = formCustomerValid();
    if (b) {
        $("#btnCustomerSave").attr('disabled', false);
    } else {
        $("#btnCustomerSave").attr('disabled', true);
    }
}

/*search Customer*/

$("#btnSearch").click(function () {
    var searchID = $("#srcCusI").val();
    var r = searchCustomer(searchID);
    if (r) {
        $("#inputI").val(r.cusID);
        $("#inputNam").val(r.name);
        $("#inputAddres").val(r.address);
        $("#inputSalar").val(r.salary);
    } else {
        clearAll();
        alert("No Such a Customer");
    }
});

function searchCustomer(id) {
    for (let i = 0; i < customerTable.length; i++) {
        if (customerTable[i].cusID == id) {
            return customerTable[i];
        }
    }
}

function getAllCustomers() {
    $("#tblCustomer").empty();
    for (let i = 0; i < customerTable.length; i++) {
        $("#tblCustomers> tbody").append("<tr>" +
            "<td>" + customerTable[i].getId() + "</td>" +
            "<td>" + customerTable[i].getName() + "</td>" +
            "<td>" + customerTable[i].getAddress() + "</td>" +
            "<td>" + customerTable[i].getSalary() + "</td>" +
            "</tr>");
    }
}

/*Update a Customer*/
$("#customerUpdate").click(function () {
    console.log("hellow");
        let cid = $("#inputI").val();
        let name = $("#inputNam").val();
        let address = $("#inputAddres").val();
        let salary = $("#inputSalar").val();

        for (var i = 0; i < customerTable.length; i++) {
            if (customerTable[i].getId() == cid ) {
                customerTable[i].setName(name);
                customerTable[i].setAddress(address);
                customerTable[i].setSalary(salary);
            }
        }
        loadAllCustomer();
});

function bindCustomer() {
    $("#tblCustomer > tr").click(function () {
        let customerID = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerSalary = $(this).children(":eq(3)").text();

        /*_________set data for text fields__________*/
        $("#inputI").val(customerID);
        $("#inputNam").val(customerName);
        $("#inputAddres").val(customerAddress);
        $("#inputSalar").val(customerSalary);

    });
}

function setCustomerDetailsValue(id, name, address, contact) {
    $("#inputI").val(id);
    $("#inputNam").val(name);
    $("#inputSalar").val(address);
    $("#inputSalar").val(contact);
}

function loadAllCustomers() {

    $("#tblCustomer").empty();
    for (var i of customerTable) {
        let row = `<tr><td>${i.getId()}</td><td>${i.getName()}</td><td>${i.getAddress()}</td><td>${i.getSalary()}</td></tr>`;
        $("#tblCustomer").append(row);

        bindCustomer();

        deleteCustomer();
    }
}

function deleteCustomer() {
    $("#btnCustomerDelete").click(function () {
        let getClickData = $("#inputI").val();
        for (let i = 0; i < customerTable.length; i++) {
            if (customerTable[i].getId() == getClickData) {
                customerTable.splice(i, 1);
            }
        }
        clearAll();
        loadAllCustomers();

    });
}


/*$("#cutomerUpdate").click(function() {
    console.log("hellow");
    if (confirm('Do you want to update ' + cusId.val() + ' details....If yes please enter Ok button...') == true) {
        for (let i = 0; i < customerTable.length; i++) {
            if (customerTable[i].setID() ==cusId .val()) {
                customerTable[i].setName(name.val());
                customerTable[i].setAddress(address.val());
                customerTable[i].setSalary(salary.val());
                $("#tblCustomer tbody tr").filter(function() {
                    rowNoToUpdate = $(this).children("td:nth-child(1)").text();
                    if ($(this).children("td:nth-child(2)").text() == customerTable[i].getId()) {
                        $(this).replaceWith("<tr><td>" + (i + 1) + "</td><td>" + customerTable[i].getId() + "</td><td>" + customerTable[i].getName() + "</td><td>" + customerTable[i].getAddress() + "</td><td>" + customerTable[i].getSalary() + "</td><td>");
                    }
                })
                clearCustomerAll();
            }
        }
    } else {
        alert('Updating ' + cusId.val() + ' Customer details is unsuccessful');
        clearCustomerAll();
    }
});*/
/*
$("#customerUpdate").click(function () {
    let id =$("#inputI").val();
    updateCustomerID(id);
    clearCustomerAll();
});

function updateCustomerID(id) {
    for (var i=0; i<customerTable.length;i++){
        if (customerTable[i].getId()==id){
            customerTable[i].setID(cusId);
            customerTable[i].setName(name);
            customerTable[i].setAddress(address);
            customerTable[i].setSalary(salary);
            loadAllCustomer();
        }
    }
}

function deleteCustomer() {
    $("#tblCustomer>tr").dblclick(function () {
        alert("Do you really need to delete this item?");
        $(this).remove();
        customerTable.pop();
    });
}*/
/*/!*deleteCustomer*!/
function deleteCustomer() {
    var s=$("#inputI").val();
    for (let i = 0; i < customerTable.length; i++) {
        if (customerTable[i].getId()==s){
            customerTable.pop();
            loadAllCustomer();
        }
    }
}

$("btnCustomerDelete").click(function () {
    let alert=confirm("Do You Want To Delete");
    if (alert){
        deleteCustomer();
        clearCustomerAll();
    }
})*/

