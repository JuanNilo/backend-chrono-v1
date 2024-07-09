import { DataSource } from "typeorm";
import { config } from 'dotenv';
import { Patient } from "../patient/entities/patient";
import { Date } from "../date/entities/date";
import { Branch } from "../branch/entities/branch";
import { Employee } from "../employee/entities/employee";
import { Speciality } from "../speciality/entities/speciality";
import { Schedule } from "../schedule/entities/schedule";
import { Workday } from "../workday/entities/workday";
import { MedicalRecord } from "../medical-record/entities/medical-record";
import { Box } from "../box/entities/box";
import { ConsultationReason } from "../consultation-reason/entities/consultation-reason";

config();
export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Patient, Date, Branch, Employee, Speciality, Schedule, Workday, MedicalRecord,Box, ConsultationReason],

});