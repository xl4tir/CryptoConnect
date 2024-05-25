
import axios from 'axios';

export async function fetchCoinsData() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=2');
    return response.data;
  } catch (error) {
    throw error;
  }
}
