export interface UserDTO {
  restrauntName: string;
  email: string;
  firebaseUid?: string;
  role?:  "admin" | "owner";
}
