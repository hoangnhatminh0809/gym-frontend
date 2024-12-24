export interface Equipment {
    id: number;
    name: string;
    room: number;
    quantity: number;
    import_date: string;
    warranty_date: string;
    origin: string;
    last_check: string;
    status: string;
}

export interface Room {
    id: number;
    name: string;
}

export interface Feedback {
    id: number;
    user: number;
    employee: number;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export interface TrainingPackage {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface TypePackage {
    id: number; 
    name: string;
    duration: string; 
    rate: number; 
}

export interface Membership {
    id: number
    user: number;
    package: number;
    type: number;
    registrationTime: string;
    expirationTime: string;
}