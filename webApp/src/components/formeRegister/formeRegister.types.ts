export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {}

export interface FormDefaultTypes {
  object: RegisterRequest;
  setObject: React.Dispatch<React.SetStateAction<RegisterRequest>>;
  function: any;
  tittle: string;
}
