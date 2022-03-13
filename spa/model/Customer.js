function Customer(id, name, address, salary) {
    let __cusid = id;
    let __name = name;
    let __address = address;
    let __salary = salary;

    this.getCustomerID = function () {
        return __cusid;
    }
    this.setCusID = function (code) {
        __cusid = id;
    }

    this.getName = function () {
        return __name;
    }
    this.setName = function (name) {
        __name = name;
    }

    this.getAddress = function () {
        return __address;
    }
    this.setAddress = function (address) {
        __address = address;
    }

    this.getSalary = function () {
        return __salary;
    }
    this.setSalary = function (salary) {
        __salary = salary;
    }
}