export interface Admin {
  image: Image;
  _id: string;
  name: string;
  email: string;
  accessLevel: number; // 1: super admin, 2: admin - for future refactoring change for role strings in the api
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  name: string;
  size: number;
  key: string;
  url: string;
}

export interface AdminLogin {
  email: string;
  password: string;
}
