const PayrollSchema = {
  employee: ObjectId,

  month: Number,

  year: Number,

  basicSalary: Number,

  bonus: Number,

  deductions: Number,

  tax: Number,

  netSalary: Number,

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid"]
  }
};