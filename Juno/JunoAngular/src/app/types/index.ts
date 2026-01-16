type PropertiesResponse = {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    results: Properties[];
}

type Properties = {
    id: number;
    price: number;
    bedrooms: number;
    bathrooms: number;
    description: string;
    latitude: number;
    longitude: number;
    address: Address;
    homeStatus: string;
    homeType: string;
    square_meters: number;
    user: User;
    isBookmarkedByUser: boolean;
    isCreatedByUser: boolean;
    images: Image[];
    createdAt: Date;
}

type Address = {
    street: string;
    city: string;
    province: string;
}
type Image = {
    imageUrl: string;
}


type AuthResponse = {
    message: string;
    token: string;
}

type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
}
