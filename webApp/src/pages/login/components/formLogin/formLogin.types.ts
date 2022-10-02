import React, { ReactComponentElement } from "react";

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  authenticationType: string;
  token: string;
  userName: string;
}

export interface FormLoginTypes {
  loginObj: LoginRequest;
  setLoginObj: React.Dispatch<React.SetStateAction<LoginRequest>>;
  login: any;
}
