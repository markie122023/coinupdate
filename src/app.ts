import { updateCoin, updateNairaRates } from "./services/updateCoins";




setInterval(updateNairaRates,1000 * 1 * 10);
setInterval(updateCoin,1000 * 60 * 10);
