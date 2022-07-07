var Price = /** @class */ (function () {
    function Price(total) {
        this.value = total;
    }
    Price.prototype.setValue = function (discount) {
        this.offerprice = this.value * discount;
        this.value = discount;
    };
    return Price;
}());
