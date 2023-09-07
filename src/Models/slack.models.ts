

export enum SlackChannels {
    CustomerRep = 'customerrepresentatives',
    Management = 'mgt-notifications',
    Engineering = 'engineering',
    Transactions = 'transactions',
    Crypto = 'crypto-slug'
  }
  
  export interface SendSlackMessageDto {
    text: string;
    channel: SlackChannels;
    icon_emoji?: string;
  }
  
  export interface GiftcardTradeFeedback {
    customerRep: string;
    management: string;
  }