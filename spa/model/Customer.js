function Customer(id, name, address, salary) {
    let __id = id;
    let __name = name;
    let __address = address;
    let __salary = salary;

    this.getId = function () {
        return __id;
    }
    this.setID = function (code) {
        __id = id;
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