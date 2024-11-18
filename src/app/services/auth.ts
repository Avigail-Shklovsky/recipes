import axios from "axios";

export async function loginAxiosForGetToken(email: string, password: string) {
  try {
    const response = await axios.post("/api/login", {
      email,
      password,
    });

    console.log("respone",response);
    
    if (response.data.token) {
      return true;
    }
  } catch (err) {
    console.log(err);

    return false;
  }
}
