/*customer save*/
function CustomerSave() {
    if ( $("#inputI").val() !==this) {
        let itemId = $("#inputI").val();
        let name = $("#inputNam").val();
        let address = $("#inputAddres").val();
        let salary = $("#inputSalar").val();

        var CustomerObject = {
            ItemID: itemId,
            name: name,
            address: address,
            salary: salary
        };
        cmbCustomers("<option>"+itemId+"</option>");
        customerTable.push(CustomerObject);
    }
}

function loadAllCustomer() {
    $("#tblCustomer").empty();
    for (var i of customerTable) {
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        $("#tblCustomer").append(row);
    }
}

$("#btnCustomerSave").click(function () {
    CustomerSave();
    loadAllCustomer();
    checkCustomerIfValid();
    clearCustomerAll();
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
        $("#inputI").val(r.id);
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
        if (customerTable[i].id == id) {
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
    if ($("#inputI").val().length !== 0) {
        let cid = $("#inputI").val();
        let name = $("#inputNam").val();
        let address = $("#inputAddres").val();
        let salary = $("#inputSalar").val();

        for (let i = 0; i < customerTable.length; i++) {
            if (customerTable[i].setID(cid)) {
                customerTable[i].setName(name);
                customerTable[i].setAddress(address);
                customerTable[i].setSalary(salary);
            }
        }
        getAllCustomers();
        alert("Customer was updated!");
        setCustomerDetailsValue("", "", "", "");
        $("#srcCusI").val("");
    }else {
        alert("Select an item to update !");
    }

});

function setCustomerDetailsValue(id, name, address, contact) {
    $("#inputI").val(id);
    $("#inputNam").val(name);
    $("#inputSalar").val(address);
    $("#inputSalar").val(contact);
}



