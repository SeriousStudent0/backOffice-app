import { HealthCenter, HealthCenterBody} from './healthCenter';
import { Address, AddressBody } from './address';
import { UserRole } from './userRole';
import { RendezVous } from './rendezVous';
import { Patient } from './patient';

export interface Doctor{
    id: number;
    name: string;
    login: string;
    password: string;
    isLogged: boolean;
    role: UserRole;
    healthCenter: HealthCenter;
    patients?: Patient[];
    address: Address;
    rdv?: RendezVous[];
}

export interface DoctorRequest{
    id?: number;
    name: string;
    login: string;
    password: string;
    isLogged: boolean;
    role: UserRole;
    healthCenter: HealthCenterBody;
    address: AddressBody;
}