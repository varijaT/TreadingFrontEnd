import axios from "axios";
import { 
  FETCH_COIN_BY_ID_FAILURE, FETCH_COIN_BY_ID_REQUEST, FETCH_COIN_BY_ID_SUCCESS, 
  FETCH_COIN_DETAILS_FAILURE, FETCH_COIN_DETAILS_REQUEST, FETCH_COIN_DETAILS_SUCCESS, 
  FETCH_COIN_LIST_FAILURE, FETCH_COIN_LIST_REQUEST, FETCH_COIN_LIST_SUCCESS, 
  FETCH_MARKET_CHART_FAILURE, FETCH_MARKET_CHART_REQUEST, FETCH_MARKET_CHART_SUCCESS, 
  FETCH_TOP_50_COINS_FAILURE, FETCH_TOP_50_COINS_REQUEST, FETCH_TOP_50_COINS_SUCCESS, 
  FETCH_TRADING_COINS_FAILURE, FETCH_TRADING_COINS_REQUEST, FETCH_TRADING_COINS_SUCCESS, 
  SEARCH_COIN_FAILURE, SEARCH_COIN_REQUEST, SEARCH_COIN_SUCCESS 
} from "./ActionTypes";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page,
        sparkline: false,
      },
    });
    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: response.data });
    console.log("Coin List:", response.data);
  } catch (error) {
    console.log("Error fetching coin list:", error);
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
  }
};

export const getTop50CoinList = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COINS_REQUEST });
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 50,
        page: 1,
        sparkline: false,
      },
    });
    dispatch({ type: FETCH_TOP_50_COINS_SUCCESS, payload: response.data });
    console.log("Top 50 Coins:", response.data);
  } catch (error) {
    console.log("Error fetching top 50 coins:", error);
    dispatch({ type: FETCH_TOP_50_COINS_FAILURE, payload: error.message });
  }
};

export const fetchTreadingCoinList = () => async (dispatch) => {
  dispatch({ type: FETCH_TRADING_COINS_REQUEST });
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    dispatch({ type: FETCH_TRADING_COINS_SUCCESS, payload: response.data });
    console.log("Trading Coins:", response.data);
  } catch (error) {
    console.log("Error fetching trading coins:", error);
    dispatch({ type: FETCH_TRADING_COINS_FAILURE, payload: error.message });
  }
};

export const fetchMarketChart = ({ coinId, days }) => async (dispatch) => {
  dispatch({ type: FETCH_MARKET_CHART_REQUEST });
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days,
      },
    });
    dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
    console.log("Market Chart Data:", response.data);
  } catch (error) {
    console.log("Error fetching market chart:", error);
    dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: error.message });
  }
};

export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${coinId}`);
    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
    console.log("Coin By ID:", response.data);
  } catch (error) {
    console.log("Error fetching coin by ID:", error);
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: error.message });
  }
};

export const fetchCoinDetails = ({ coinId, jwt }) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/coins/${coinId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
    console.log("Coin Details:", response.data);
  } catch (error) {
    console.log("Error fetching coin details:", error);
    dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: error.message });
  }
};

export const searchCoin = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_COIN_REQUEST });
  try {
    const response = await axios.get(`${COINGECKO_BASE_URL}/search`, {
      params: { query: keyword },
    });
    dispatch({ type: SEARCH_COIN_SUCCESS, payload: response.data.coins });
    console.log("Search Results:", response.data.coins);
  } catch (error) {
    console.log("Error searching coin:", error);
    dispatch({ type: SEARCH_COIN_FAILURE, payload: error.message });
  }
};