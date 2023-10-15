import { HealthCenter } from './healthCenter';
import { Address } from './address';
import { UserRole } from './userRole';
import { RendezVous } from './rendezVous';
import { Patient } from './patient';

export interface Doctor{
    id: number;
    name: string;
    login: string;
    log: boolean;
    role: UserRole;
    healthCenter: HealthCenter;
    patients: Patient[];
    address: Address;
    rdv: RendezVous[];
}