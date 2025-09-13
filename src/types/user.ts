export interface Address {
  street: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: Company;
  address: Address;
  website?: string;
  username?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}