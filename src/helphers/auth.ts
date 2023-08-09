import axios from "axios";
import { BASE_URL, DTUNES_PASSWORD, DTUNES_USER } from "../services/config";
import { setToken } from "./nedb.helpher";

export async function generateToken(): Promise<string>{
  try {
    const {data} = await  axios.post(BASE_URL + "/v1/admin-auth/login",{email: DTUNES_USER, password: DTUNES_PASSWORD});
    console.log(data.message)
    if(data.message == 'Login successful'){
     await setToken(data.data.token)
      //process.env.DTUNES_TOKEN = data.data.token;
      return data.data.token;
    }
    else{
      return  ''
    }
  } catch (error) {
   throw error;
  }

}