/*customer save*/
$("#btnCustomerSave").attr('disable', true);

function CustomerSave() {
    let id = $("#inputI").val();
    let name = $("#inputNam").val();
    let address = $("#inputAddres").val();
    let salary = $("#inputSalar").val();

    var CustomerObject = {
        id: id,
        name: name,
        address: address,
        salary: salary
    };

    customerTable.push(CustomerObject);

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
    checkIfValid();
    clearAll();
});

function clearAll() {
    $('#inputI,#inputNam,#inputAddres,#inputSalar').val("");
    $('#inputI').focus();
    $("#btnCustomerSave").attr('disabled', true);
    loadAllCustomer();
}

/*validation*/

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#inputI,#inputNam,#inputAddres,#inputSalar').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#inputI,#inputNam,#inputAddres,#inputSalar').on('blur', function () {
    formValid();
});

$("#inputI").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
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
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#inputAddres").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#inputSalar").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#btnCustomerSave").attr('disabled', true);

function formValid() {
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

function checkIfValid() {
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

function setButton() {
    let b = formValid();
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
    }else{
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



