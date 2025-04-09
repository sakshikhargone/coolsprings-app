export class BookingModel {
  constructor(
    customerId,
    customerName,
    customerPhone,
    numOfTickets = 1,
    paymentMode = "Cash",
    actualAmount,
    paidAmount,
    discountCode,
    discountId,
    validFrom,
    expiryDate,
    upiTxnRefNumber
  ) {
    this.customerId = customerId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
    this.numOfTickets = numOfTickets;
    this.paymentMode = paymentMode;
    this.actualAmount = actualAmount;
    this.paidAmount = paidAmount;

    this.discountCode = discountCode;
    this.discountId = discountId;
    this.validFrom = validFrom;
    this.expiryDate = expiryDate;

    this.upiTxnRefNumber = upiTxnRefNumber;
  }
}
