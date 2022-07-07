class Price {
  readonly value: number;
  offerprice: number;

  constructor(total) {
    this.value = total;
  }

  setValue(discount) {
    this.offerprice = this.value * discount;

    // error TS2540: Cannot assign to 'value' because it is a read-only property
    this.value = discount;
  }
}
