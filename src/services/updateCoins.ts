import axios from "axios";
import { BASE_URL, BINANCE_URL, DTUNES_TOKEN } from "./config";
import { generateToken } from "../helphers/auth";
import { sentry } from "../helphers/sentry.errorhandler";
import { getToken } from "../helphers/nedb.helpher";

export const updateCoin = async ()=>{
    try {
        const resp = await  axios.get(BINANCE_URL + '/api/v3/ticker/24hr?symbols=["XRPUSDT","USDCUSDT","USDTNGN"]');
        console.log(resp.data);
        let resp2 = await axios.put(BINANCE_URL + '/v2/crypto-admin/coin-records', resp.data);
        console.log(resp2.data);
        return;
      } catch (error) {  
      sentry.captureException(error);
          console.log(error);
      }
}

export const updateNairaRates = async (generatedToken: string = '')=>{
    try {
        const resp = await  axios.get(BINANCE_URL + '/api/v3/ticker/24hr?symbols=["USDTNGN"]');
       // console.log(resp.data);
      const data =  {key:'usdt-niara-rate', value: resp.data[0].lastPrice };
      console.log('uploaded data here',data);
      const redisToken = await getToken();
      const token = generatedToken || redisToken;
      console.log('token :', token);
      try {
        const resp2 = await axios.put(BASE_URL + '/v1/preferences/settings',data, {
          headers: {Authorization: 'Bearer ' + token}
          
        } );
        console.log('final code', resp2.data);
      } catch (error) {
        console.log('the error here is a token error');
       let token = await generateToken();
      await updateNairaRates(token);
      }
    
    } catch (error) {
      console.log(error);
     // sentry.captureException(error);
       
    }
}