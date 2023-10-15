import { Doctor } from "./doctor";
import { Patient } from "./patient";


export interface RendezVous{
    id: number;
    date: Date;
    doctor: Doctor;
    patient: Patient;
}