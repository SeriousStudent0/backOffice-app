import { Address, AddressBody, AddressRequest } from './address';
import { Doctor } from './doctor';

export interface HealthCenter{
    id: number;
    name: string;
    address: Address;
    doctorList: Doctor[];
}

export interface HealthCenterRequest{
    id?: number;
    name: string;
    address: AddressBody;
}

export interface HealthCenterBody{
    id: number;
}