export interface User {
  username: string;
  fullName: string;
  bio: string;
  image: string;
  isPublic: boolean;
  isVerified: boolean;
  followersCount: number;
  followingCount: number;
}