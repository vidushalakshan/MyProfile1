/*customer save and update*/
let cusId = $("#inputI").val();
let name = $("#inputNam").val();
let address = $("#inputAddres").val();
let salary = $("#inputSalar").val();

$("#btnCustomerSave").click(function () {
    let cusId = $("#inputI").val();
    let name = $("#inputNam").val();
    let address = $("#inputAddres").val();
    let salary = $("#inputSalar").val();

    let nullVal = '';
    if (cusId == nullVal || name == nullVal || address == nullVal || salary == nullVal) {
        alert("warning-Please Input Data Correctly To Continue..");
        return;
    }
    let index = isExists(cusId);
    if (index != -1) {
        alert("Customer Updated");
        customerTable[index].setName(name);
        customerTable[index].setAddress(address);
        customerTable[index].setSalary(salary);
        loadAllCustomer();
        bindEvent();
        return;
    }

    let c1 = new Customer(cusId, name, address, salary);
    customerTable.push(c1);
    loadAllCustomer();
    bindEvent();
    clearCustomerAll();

});


function loadAllCustomer() {
    $("#tblCustomer>tr").remove();
    for(let i=0;i<customerTable.length;i++){
        let customerID=customerTable[i].getCustomerID();
        let customerName=customerTable[i].getName();
        let customerAddress=customerTable[i].getAddress();
        let customerTP=customerTable[i].getSalary();
        let row = `<tr><td>${customerID}</td><td>${customerName}</td><td>${customerAddress}</td><td>${customerTP}</td></tr>`;
        $("#tblCustomer").append(row);
    }
}

function bindEvent() {
    $("#tblCustomer>tr").off("click");
    $("#tblCustomer>tr").click(function () {
        let Row = $(this);
        let CustomerID = $(Row.children().get(0)).text();
        let CustomerName = $(Row.children().get(1)).text();
        let CustomerAddress = $(Row.children().get(2)).text();
        let CustomerTP = $(Row.children().get(3)).text();
        //Assignment
        $("#inputI").val(CustomerID);
        $("#inputNam").val(CustomerName);
        $("#inputAddres").val(CustomerAddress);
        $("#inputSalar").val(CustomerTP);
    });
}

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

/*customer search*/
$("#btnSearch").click(function () {
    let property=$("#srcCusI").val();
    let index=isExists(property,property);
    if(index!=-1){
        alert("Customer Found");
        $("#inputI").val(customerTable[index].getCustomerID());
        $("#inputNam").val(customerTable[index].getName());
        $("#inputAddres").val(customerTable[index].getAddress());
        $("#inputSalar").val(customerTable[index].getSalary());
        return;
    }
    alert("Customer Not Found");
});

/*customer delete */
$("#btnCustomerDelete").click(function () {
    console.log("helo");
    let customerID = $("#inputI").val();
    let index = isExists(customerID);
    if (index != -1) {
        customerTable.splice(index, 1);
        loadAllCustomer()
        alert("Customer " + customerID + " Deleted");
        clearCustomerAll();
        return;
    }
    alert("No Customer Found");
});

function isExists(id, address) {
    let x = -1;
    for (let i = 0; i < customerTable.length; i++) {
        if (customerTable[i].getCustomerID() == id || customerTable[i].getAddress() == address) {
            x = i;
        }
    }
    return x;
}

$("#customerClear").click(function () {
    $('#inputI,#inputNam,#inputAddres,#inputSalar').val("");
    $('#inputI').focus();
    $("#btnCustomerSave").attr('disabled', true);
});


