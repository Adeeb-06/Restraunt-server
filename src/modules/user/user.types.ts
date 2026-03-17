export interface UserDTO {
  username: string;
  email: string;
  firebaseUid?: string;
  role?:  "admin" | "owner";
}
