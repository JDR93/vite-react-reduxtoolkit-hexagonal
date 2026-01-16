export interface UserBase {
  name: string;
  email: string;
  github: string;
  status: string;
}

export interface User extends UserBase {
  id: number;
}
