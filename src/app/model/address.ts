

export interface Address{
    id: number;
    country: string;
    city: string;
    street: string;
    streetNumber: number;
    postalCode: number;
}

export interface AddressRequest{
    id?: number;
    country: string;
    city: string;
    street: string;
    streetNumber: number;
    postalCode: number;
}

export interface AddressBody{
    id: number;
}