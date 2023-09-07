import { updateCoin, updateNairaRates } from "./services/updateCoins";


 setInterval(updateNairaRates,1000 * 60  * 3);
 setInterval(updateCoin,1000 * 60 * 10);
