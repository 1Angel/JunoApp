export interface PropertiesResponse {
    pageNumber: number;
    pageSize:   number;
    totalCount: number;
    results:    Properties[];
}

export interface Properties {
    id:            number;
    price:         number;
    bedrooms:      number;
    bathrooms:     number;
    description:   string;
    latitude:      number;
    longitude:     number;
    address:       Address;
    homeStatus:    string;
    homeType:      string;
    square_meters: number;
    user:          User;
    images:        Image[];
    createdAt:     Date;
}

export interface Address {
    street:   string;
    city:     string;
    province: string;
}

export interface Image {
    imageUrl: string;
}

export interface User {
    id:         string;
    first_name: string;
    last_name:  string;
    email:      string;
}
