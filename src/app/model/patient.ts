import { Address } from "./address";
import { Doctor } from "./doctor";
import { RendezVous } from "./rendezVous";


export interface Patient{
    id?: number;
    name: string;
    vaccinated: boolean;
    address: Address;
    doctor: Doctor;
    rdv: RendezVous[];
}