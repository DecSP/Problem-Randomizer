import { QuestionSources } from "../types/questions-source";
export interface IconProps {
  height?: number;
  width?: number;
  className?: string;
}

export interface GetUsersData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Problem {
  source_type: QuestionSources;
  name: string;
  contest_name: string;
  url: string;
  rating: number;
}
