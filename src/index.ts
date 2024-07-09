import express from 'express';
import "reflect-metadata";
import database from './config/db';
import cors from 'cors';
import PatientRoutes from './patient/patient.routes';
import DateRoutes from './date/date.routes';
import BranchRoutes from './branch/branch.routes';
import AuthRoutes from './auth/auth.routes';
import EmployeeRoutes from './employee/employee.routes';
import SpecialityRoutes from './speciality/speciality.routes';
import ScheduleRoutes from './schedule/schedule.routes';
import WorkdayRoutes from './workday/workday.routes';
import MedicalRecotdRoutes from './medical-record/medical-record.routes';
import BoxRoutes from './box/box.routes';
import ConsultationReasonRoutes from './consultation-reason/consultation-reason.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
database.initialize()
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(error));
app.use('/api', WorkdayRoutes, PatientRoutes, DateRoutes, BranchRoutes, AuthRoutes, EmployeeRoutes, SpecialityRoutes, ScheduleRoutes, MedicalRecotdRoutes, BoxRoutes,ConsultationReasonRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});