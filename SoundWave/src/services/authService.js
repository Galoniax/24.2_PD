import { axiosInterceptor } from "../interceptor/axios-interceptor";

export const authService = async (email, password) => {
  // Exportación nombrada
  try {
    // Hacer un GET a todos los usuarios
    const response = await axiosInterceptor.get("/users");
    const user = response.data.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Si encontramos un usuario con ese email y contraseña
      return user;
    } else {
      // Si no, retornamos un error
      throw "Credenciales incorrectas";
    }
  } catch (err) {
    console.log(err);
    throw err; // Lanzar el error si ocurre algo
  }

  //Backend
  /*try {
        const response = await axiosInterceptor.post(`/login`, { email, password });
        return response.data;
    } catch (err) {
        console.log(err.response.data.message);
        throw err.response.data.message;
    }*/
};
