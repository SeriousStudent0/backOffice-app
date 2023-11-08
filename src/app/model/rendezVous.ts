import { Doctor, DoctorBody } from "./doctor";
import { Patient } from "./patient";


export interface RendezVous{
    id: number;
    date: Date;
    doctor: Doctor;
    patient: Patient;
    validated: boolean;
}

export interface RendezVousRequest{
    id: number;
    doctor: DoctorBody;
}

export interface RendezVousBody{
    id: number;
}