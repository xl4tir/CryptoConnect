import PortfolioService from '../services/portfolioService';

export async function assertProcessing(portfolio, coins, setPortfolioTransactions, setPortfolioAssets, setIsLoading) {
    try {
        if (portfolio && coins.length > 0) {
            const portfolioId = portfolio._id;
            const filteredTransactions = await PortfolioService.getPortfolioTransactions(portfolioId);

            const assetMap = {};
            const totalCostMap = {};
            const totalAmountMap = {};

            const currentPrices = {};
            const priceChange_1h = {};
            const priceChange_24h = {};
            const priceChange_7d = {};
            const symbol = {};
            const image = {};

            filteredTransactions.forEach((transaction) => {
                const { cryptocurrency, amount, operation, purchasePrice } = transaction;
                if (!assetMap[cryptocurrency]) {
                    assetMap[cryptocurrency] = 0;
                    totalCostMap[cryptocurrency] = 0;
                    totalAmountMap[cryptocurrency] = 0;
                }

                if (operation) { // Buy operation
                    assetMap[cryptocurrency] += amount;
                    totalCostMap[cryptocurrency] += amount * purchasePrice;
                    totalAmountMap[cryptocurrency] += amount;
                } else { // Sell operation
                    assetMap[cryptocurrency] -= amount;
                }

                const coin = coins.find((coin) => coin.name === cryptocurrency);

                if (coin) {
                    currentPrices[cryptocurrency] = coin.current_price;
                    priceChange_1h[cryptocurrency] = coin.price_change_percentage_1h_in_currency.toFixed(2);
                    priceChange_24h[cryptocurrency] = coin.price_change_percentage_24h_in_currency.toFixed(2);
                    priceChange_7d[cryptocurrency] = coin.price_change_percentage_7d_in_currency.toFixed(2);
                    symbol[cryptocurrency] = coin.symbol.toUpperCase();
                    image[cryptocurrency] = coin.image;
                }
            });

            const assets = Object.keys(assetMap).map((cryptocurrency) => {
                const holdings = assetMap[cryptocurrency];
                const totalCost = totalCostMap[cryptocurrency];
                const totalAmount = totalAmountMap[cryptocurrency];
                const avgBuyPrice = totalAmount > 0 ? (totalCost / totalAmount).toFixed(2) : 0;
                const price = currentPrices[cryptocurrency];
                const holdingsUSD = (price * holdings).toFixed(2);
                const profit = (price - avgBuyPrice) * holdings;
                const profitPercentage = avgBuyPrice > 0 ? ((price - avgBuyPrice) / avgBuyPrice * 100).toFixed(2) : 0;

                return {
                    cryptocurrency,
                    holdings,
                    avgBuyPrice,
                    price,
                    holdingsUSD,
                    priceChange_1h: priceChange_1h[cryptocurrency],
                    priceChange_24h: priceChange_24h[cryptocurrency],
                    priceChange_7d: priceChange_7d[cryptocurrency],
                    symbol: symbol[cryptocurrency],
                    image: image[cryptocurrency],
                    profit: profit.toFixed(2),
                    profitPercentage,
                };
            });

            setPortfolioTransactions(filteredTransactions);
            setPortfolioAssets(assets);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
}
