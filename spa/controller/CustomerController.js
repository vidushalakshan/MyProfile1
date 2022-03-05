/*customer save*/

function CustomerSave() {
    let id=$("#inputI").val( );
    let name=$("#inputNam").val();
    let address=$("#inputAddres").val();
    let salary=$("#inputSalar").val();

    var CustomerObject={
        id:id,
        name:name,
        address:address,
        salary:salary
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
    clearAll();
});

function clearAll() {
    $('#inputI,#inputNam,#inputAddres,#inputSalar').val("");
    $('#inputI').focus();
    $("#btnCustomerSave").attr('disabled', true);
    loadAllCustomer();
}



