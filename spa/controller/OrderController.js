/*
Load Customers to Combo Box*/

function cmbCustomers(value) {
    $("#cmbCustomer").append(value);
}

/*
Load Item to Combo Box*/
function cmbItem(values) {
    $("#cmbItem").append(values);
}

/*add customer text field*/
let customerId = "none";
$("#cmbCustomer").change(function () {
    let id = $(this).children("option:selected").text();
    customerId = id;
    if (id.toLowerCase() === "select") {
        setCustomerOrder("", "", "","");
        customerId = "none";
    }
    for (let i = 0; i < customerTable.length; i++) {
        if (customerTable[i].getCustomerID() == id) {
            setCustomerOrder(customerTable[i].getCustomerID(), customerTable[i].getName(), customerTable[i].getAddress(), customerTable[i].getSalary());
        }
    }
});

function setCustomerOrder(id , name, address, salary) {
    $("#txtCustomerId").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
}

/*add item text field*/
let itemId = "none";
$("#cmbItem").change(function () {
    let code = $(this).children("option:selected").text();
    itemId = code;
    if (code.toLowerCase() === "select") {
        setItem("", "", "","");
        itemId = "none";
    }
    for (let i = 0; i < itemTable.length; i++) {
        if (itemTable[i].getCode() == code) {
            setItem(itemTable[i].getCode(), itemTable[i].getItemName(), itemTable[i].getPrice(), itemTable[i].getQty());
        }
    }
});

function setItem(code , itemName, price, qty) {
    $("#txtItemCode").val(code);
    $("#txtItemName").val(itemName);
    $("#txtItemPrice").val(price);
    $("#txtQtyOnHand").val(qty);
}