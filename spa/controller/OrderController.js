/*
Load Customers to Combo Box*/

function cmbCustomers(value) {
    $("#cmbCustomer").append(value);
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
        if (customerTable[i].getId() === id) {
            setCustomerOrder(customerTable[i].getId(), customerTable[i].getName(), customerTable[i].getAddress(), customerTable[i].getSalary());
        }
    }
});

function setCustomerOrder(id , name, address, salary) {
    $("#txtCustomerId").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
}

