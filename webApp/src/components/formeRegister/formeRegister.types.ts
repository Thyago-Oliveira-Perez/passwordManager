export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {}

export interface UpdateUserDatasRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDatasResponse {}

export interface FormDefaultTypes {
  object: RegisterRequest;
  setObject: React.Dispatch<React.SetStateAction<RegisterRequest>>;
  function: any;
  title: string;
}
