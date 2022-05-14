export interface Plan {
  key: string;
  slug?: string;
  title?: string;
  image?: string;
  link?: string;
  start?: {
    utc: string;
  };
  end?: {
    utc: string;
  };
  location?: {
    name: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    coordinates: string | null;
  };
  attendingOrInterested?: Attendee[];
  attendingOrInterestedCount?: number;
  description?: string;
}

export interface Attendee {
  username: string;
  fullName: string;
  image: string;
}