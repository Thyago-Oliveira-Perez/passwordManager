export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse{
  
}

export interface FormRegisterTypes {
  registerObj: RegisterRequest
  setRegisterObj: React.Dispatch<React.SetStateAction<RegisterRequest>>;
  register: any;
}
