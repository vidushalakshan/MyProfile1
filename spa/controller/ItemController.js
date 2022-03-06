/*item save*/
function ItemSave() {
    let id = $("#inputId").val();
    let name = $("#inputName").val();
    let price = $("#inputPrice").val();
    let qty = $("#inputQty").val();

    var ItemObject = {
        id: id,
        name: name,
        price: price,
        qty: qty
    };
    itemTable.push(ItemObject);
}

function loadAllItem() {
    $("#itemTable").empty();
    for (var i of itemTable) {
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.price}</td><td>${i.qty}</td></tr>`;
        $("#itemTable").append(row);
    }
}

$("#btnItemSave").click(function () {
    loadAllItem();
    checkIfValid();
    clearAll();
});

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