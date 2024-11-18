import axios from "axios";

export async function fetchProtectedData() {
  try {
    const response = await axios.get("/api/auth", {
      withCredentials: true,
    });
    const data = response.data;
    console.log("protected data", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("error:", error.response.data.message);
    } else {
      console.log("error:", error);
    }
    return null;
  }
}


export async function loginAxiosForGetToken(email: string, password: string) {
  try {
    const response = await axios.post("/api/login", {
      email,
      password,
    });

    if (response.data.token) {
      return true;
    }
  } catch (err) {
    console.log(err);

    return false;
  }
}
