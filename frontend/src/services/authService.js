import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const loginAsync = async (email, password) => {
  try {
    const response = await axiosInterceptor.get("/users");
    const users = response.data;

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("Credenciales incorrectas");
    }

    return user;
  } catch (error) {
    console.error("Error en login:", error.message);
    throw error;
  }
};

export const registerAsync = async (username, email, password) => {
  try {
    const response = await axiosInterceptor.get("/users");
    const users = response.data;

    const existingUser = users.find(
      (user) => user.email.toLowerCase() == email.toLowerCase()
    );

    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    const newUser = {
      id: String(users.length + 1),
      username,
      email,
      password,
      role: "user",
    };

    const postResponse = await axiosInterceptor.post("/users", newUser);
    return postResponse.data;
  } catch (error) {
    console.error("Error en registro:", error.message);
    throw error;
  }
};


