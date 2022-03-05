function Order(oid,cusId,date,qty,discount,total) {
    let __oid=oid;
    let __cusId=cusId;
    let __date=date;
    let __qty=qty;
    let __discount=discount;
    let __total=total;

    this.getOid=function () {
        return oid;
    }
    this.setOid=function (oid) {
        __oid=oid;
    }

    this.getCusId=function () {
        return cusId;
    }
    this.setCusId=function (cusId) {
        __cusId=cusId;
    }

    this.getDate=function () {
        return date;
    }
    this.setDate=function (date) {
        __date=date;
    }

    this.getQty=function () {
        return qty;
    }
    this.setQty=function (qty) {
        __qty=qty;
    }

    this.getDiscount=function () {
        return discount;
    }
    this.setDiscount=function (discount) {
        __discount=discount;
    }

    this.getTotal=function () {
        __total=total;
    }
    this.setTotal=function (total) {
        __total=total;
    }
}