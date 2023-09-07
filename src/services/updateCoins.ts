import axios from "axios";
import { BASE_URL, BINANCE_URL } from "./config";
import { generateToken } from "../helphers/auth";
import { sentry } from "../helphers/sentry.errorhandler";
import { getToken } from "../helphers/nedb.helpher";
import {ScrapperHelpher } from "../helphers/scraper.helpher";
import { SlackHelpher } from "../helphers/slack.helpher";
import { SlackChannels } from "../Models/slack.models";

const scraper = new ScrapperHelpher();

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
       const scrapedData = await scraper.scrapeJSWebsiteByClassName();
       console.log("the scrapedData", scrapedData);
      const data =  {p2p: scrapedData, official: resp.data[0].lastPrice };
      console.log('uploaded data here',data);
      const redisToken = await getToken();
      const token = generatedToken || redisToken;
      console.log('token :', token);
      try {
        const resp2 = await axios.put(BASE_URL + '/v1/preferences/settings/dollar-rate',data, {
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
     const slack = new SlackHelpher();
      slack.sendChat({
        channel: SlackChannels.Crypto,
        text: "the last attempt to update usd rate failed",

      })
       
    }
}