$("#item").css("display", "none");
$("#customer").css("display", "none");
$("#home").css("display", "");

$("#linkCustomer").click(function () {
    $("#customer").css("display", "block");
    $("#home").css("display", "none");
    $("#item").css("display", "none");
});

$("#linkItem").click(function () {
    $("#item").css("display", "block");
    $("#customer").css("display", "none");
    $("#home").css("display", "none");
});

$("#linkHome").click(function () {
    $("#home").css("display", "");
    $("#item").css("display", "none");
    $("#customer").css("display", "none");
});