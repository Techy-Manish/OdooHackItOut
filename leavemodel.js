const LeaveSchema = {
  employee: ObjectId,

  leaveType: {
    type: String,
    enum: [
      "Sick",
      "Casual",
      "Earned",
      "Maternity",
      "Paternity"
    ]
  },

  startDate: Date,

  endDate: Date,

  reason: String,

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"]
  },

  approvedBy: ObjectId
};