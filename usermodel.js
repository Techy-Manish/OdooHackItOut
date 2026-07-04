const UserSchema = {
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    enum: ["Admin", "HR", "Manager", "Employee"]
  },
  employeeId: String,
  isActive: Boolean,
  createdAt: Date
};