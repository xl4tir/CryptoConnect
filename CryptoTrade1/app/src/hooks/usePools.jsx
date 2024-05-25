import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { ROUTER_ADDRESS } from "../config";
import { getFactoryInfo, getRouterInfo } from "../utils/index.js";

export const loadPools = async (provider) => {
  const routerInfo = await getRouterInfo(ROUTER_ADDRESS, provider);
  const factoryInfo = await getFactoryInfo(routerInfo.factory, provider);
  return factoryInfo.pairsInfo;
};

export const usePools = () => {
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState({});

  useEffect(() => {
    const ethereum = window.ethereum;
    const provider = new ethers.providers.Web3Provider(ethereum);

    loadPools(provider)
      .then((pools) => {
        setPools(pools);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading pools:", error);
        setLoading(false);
      });
  }, []);

  return [loading, pools];
};
