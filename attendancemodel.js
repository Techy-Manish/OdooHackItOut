const AttendanceSchema = {
  employee: ObjectId,

  date: Date,

  checkIn: Date,

  checkOut: Date,

  totalHours: Number,

  status: {
    type: String,
    enum: ["Present", "Absent", "Half Day", "Leave"]
  }
};