

function clearAll() {
    $('#inputId,#inputName,#inputPrice,#inputQty').val("");
    $('#inputId').focus();
    $("#btnSave").attr('disabled', true);
    loadAllItem();
}


/*validation*/

var itemCodeRegEx = /^(I00-)[0-9]{3}$/;
var itemNameRegEx = /^[A-z ]{4,}$/;
var itemUnitPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
var itemQtyOnHandRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#inputId,#inputName,#inputPrice,#inputQty').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#inputId,#inputName,#inputPrice,#inputQty').on('blur', function () {
    formValid();
});

$("#inputId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedItemID = $("#inputId").val();
        var srcItem = searchItemFromID(typedItemID);
        $("#inputId").val(srcItem.getCode());
        $("#inputName").val(srcItemr.getItemName());
        $("#inputPrice").val(srcItem.getPrice());
        $("#inputQty").val(srcItem.getQty());
    }


});

$("#inputName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#inputPrice").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#inputQty").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#btnItemSave").attr('disabled', true);

function formValid() {
    var cusID = $("#inputId").val();
    $("#inputId").css('border', '2px solid green');
    $("#lblItemid").text("");
    if (itemCodeRegEx.test(cusID)) {
        var itemName = $("#inputName").val();
        if (itemNameRegEx.test(itemName)) {
            $("#inputName").css('border', '2px solid green');
            $("#lblItemname").text("");
            var itemPrice = $("#inputPrice").val();
            if (itemUnitPriceRegEx.test(itemPrice)) {
                var itemQty = $("#inputQty").val();
                var resp = itemQtyOnHandRegEx.test(itemQty);
                $("#inputPrice").css('border', '2px solid green');
                $("#lblItemPrice").text("");
                if (resp) {
                    $("#inputQty").css('border', '2px solid green');
                    $("#lblItemQty").text("");
                    return true;
                } else {
                    $("#inputQty").css('border', '2px solid red');
                    $("#lblItemQty").text("Item qty is a required field : Pattern 10");
                    return false;
                }
            } else {
                $("#inputPrice").css('border', '2px solid red');
                $("#lblItemPrice").text("Item Price is a required field : 10.00 or 1000");
                return false;
            }
        } else {
            $("#inputName").css('border', '2px solid red');
            $("#lblItemname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#inputId").css('border', '2px solid red');
        $("#lblItemid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#inputId").val();
    if (itemCodeRegEx.test(cusID)) {
        $("#inputName").focus();
        var itemName = $("#inputName").val();
        if (cusNameRegEx.test(itemName)) {
            $("#inputPrice").focus();
            var itemPrice = $("#inputPrice").val();
            if (itemUnitPriceRegEx.test(itemPrice)) {
                $("#inputQty").focus();
                var itemQty = $("#inputQty").val();
                var resp = itemQtyOnHandRegEx.test(itemQty);
                if (resp) {
                    let res = confirm("Do you really need to add this Item..?");
                    if (res) {
                        ItemSave();
                        loadAllItem();
                        clearAll();
                    }
                } else {
                    $("#inputQty").focus();
                }
            } else {
                $("#inputPrice").focus();
            }
        } else {
            $("#inputName").focus();
        }
    } else {
        $("#inputId").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnItemSave").attr('disabled', false);
    } else {
        $("#btnItemSave").attr('disabled', true);
    }
}

/*search Customer*/

/*$("#btnItemSearch").click(function () {
    let property=$("#srcItemID").val();
    let index=isExists(property,property);
    if(index!=-1){
        alert("Item Found....");
        $("#inputId").val(itemTable[index].getCode());
        $("#inputName").val(itemTable[index].getItemName());
        $("#inputPrice").val(itemTable[index].getPrice());
        $("#inputQty").val(itemTable[index].getQty());
        return;
    }
    alert("Item Not Found...");
});*/


/*item save and update*/

$("#btnItemSave").click(function () {
    let itemID = $("#inputId").val();
    let itemName = $("#inputName").val();
    let price = $("#inputPrice").val();
    let qty = $("#inputQty").val();

    let nullVal = '';

    if (itemID == nullVal || itemName == nullVal || price == nullVal || qty == nullVal) {
        alert("warning-Please Input Data Correctly To Continue..");
        return;
    }
    let index = isExists(cusId);
    if (index != -1) {
        alert("Item Updated");
        itemTable[index].setItemName(itemName);
        itemTable[index].setPrice(price);
        itemTable[index].setQty(qty);
        loadAllItem();
        bindEvent();
        return;
    }

    let i1 = new Customer(itemID, itemName, price, qty);
    itemTable.push(i1);
    loadAllItem()
    bindEvent();
    clearAll();
});


function loadAllItem() {
        $("#itemTable>tr").remove();

        for(let i=0;i<itemTable.length;i++){
            let itemID=itemTable[i].getCustomerID();
            let itemName=itemTable[i].getName();
            let price=itemTable[i].getAddress();
            let qty=itemTable[i].getSalary();
            let row = `<tr><td>${itemID}</td><td>${itemName}</td><td>${price}</td><td>${qty}</td></tr>`;
            $("#itemTable").append(row);
        }

}

function bindEvent() {
    $("#itemTable>tr").off("click");
    $("#itemTable>tr").click(function () {
        let Row = $(this);
        let itemID = $(Row.children().get(0)).text();
        let itemName = $(Row.children().get(1)).text();
        let price = $(Row.children().get(2)).text();
        let qty = $(Row.children().get(3)).text();
        //Assignment
        $("#inputId").val(itemID);
        $("#inputName").val(itemName);
        $("#inputPrice").val(price);
        $("#inputQty").val(qty );
    });
}

