function Item(code, name, qty, price) {
    let __code = code;
    let __name = name;
    let __qty = qty;
    let __price = price;

    this.getCode = function () {
        return __code;
    }
    this.setCode = function (code) {
        __code = code;
    }

    this.getItemName = function () {
        return name;
    }
    this.setItemName = function (name) {
        __name = name;
    }

    this.getQty = function () {
        __qty = qty;
    }
    this.setQty = function (qty) {
        __qty = qty;
    }

    this.getPrice = function () {
        return price;
    }
    this.setPrice = function (price) {
        __price = price;
    }
}