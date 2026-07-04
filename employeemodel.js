const EmployeeSchema = {
  userId: ObjectId,

  firstName: String,
  lastName: String,
  gender: String,
  dob: Date,

  phone: String,
  address: String,

  department: ObjectId,
  designation: ObjectId,

  joiningDate: Date,

  salary: Number,

  manager: ObjectId,

  employmentType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Intern", "Contract"]
  },

  status: {
    type: String,
    enum: ["Active", "Resigned", "Terminated"]
  }
};