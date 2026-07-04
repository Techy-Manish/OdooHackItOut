require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const attendanceRoutes =
require("./routes/attendanceRoutes");

const leaveRoutes =
require("./routes/leaveRoutes");

const payrollRoutes =
require("./routes/payrollRoutes");

const app =
express();

connectDB();

app.use(cors());

app.use(express.json());

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/attendance",
attendanceRoutes
);

app.use(
"/api/leave",
leaveRoutes
);

app.use(
"/api/payroll",
payrollRoutes
);

app.listen(
process.env.PORT,
()=>{
console.log(
"Server Running"
);
}
);
