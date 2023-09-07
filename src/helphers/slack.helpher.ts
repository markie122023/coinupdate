import axios from "axios";
import { SendSlackMessageDto } from "../Models/slack.models";
const {SLACK_AUTH} = process.env;

export class SlackHelpher {
    private API_BASE = `https://slack.com/api`;
    private ENDPOINTS = {
  sendMessage: `${this.API_BASE}/chat.postMessage`,
};
    constructor(){}

 async sendChat(payload: SendSlackMessageDto): Promise<void> {
        payload.icon_emoji = ':speak_no_evil:';
      await  axios
          .post(`${this.ENDPOINTS.sendMessage}`, payload, {
            headers: {
              Authorization: `Bearer ${SLACK_AUTH}`,
            },
          })
      }
    

}