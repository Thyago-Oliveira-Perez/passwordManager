const Api = AxiosClient({
  baseURL: "http://localhost:8080",
  headers: { "Content-type": "application/json" },
});

const authService = new AuthService(); 

Api.interceptors.request.use(async config => {

  const token = authService.getLoggedUser().token;

  if (token) {
    Api.defaults.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default Api;
