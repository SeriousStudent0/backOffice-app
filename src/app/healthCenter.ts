import { Address } from './address';
import { Doctor } from './doctor';

export interface HealthCenter{
    id?: number;
    name: string;
    address: Address;
    doctors: Doctor[];
}