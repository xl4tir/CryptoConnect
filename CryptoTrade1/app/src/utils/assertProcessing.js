import PortfolioService from '../services/portfolioService';

export async function assertProcessing(portfolio, coins, setPortfolioTransactions, setPortfolioAssets, setIsLoading) {
    try {
        // Перевірка наявності портфоліо та даних про монети
        if (portfolio && coins.length > 0) {
            const portfolioId = portfolio._id;

            // Отримання транзакцій з сервера за допомогою сервісу
            const filteredTransactions = await PortfolioService.getPortfolioTransactions(portfolioId);

            // Створюємо об'єкти для збереження кількості та середньої ціни покупки кожної криптовалюти
            const assetMap = {};
            const avgBuyPriceMap = {};

            // Отримуємо актуальну ціну для кожної криптовалюти з масиву coins
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
                    avgBuyPriceMap[cryptocurrency] = 0;
                }

                if (operation) {
                    // Покупка
                    assetMap[cryptocurrency] += amount;
                    avgBuyPriceMap[cryptocurrency] += amount * purchasePrice;
                } else {
                    // Продаж
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

            // Обчислюємо середню ціну покупки для кожної криптовалюти
            Object.keys(avgBuyPriceMap).forEach((cryptocurrency) => {
                const totalAmount = assetMap[cryptocurrency];
                avgBuyPriceMap[cryptocurrency] /= totalAmount;
            });

            // Створюємо список активів з інформацією про криптовалюти, кількість та середню ціну покупки
            const assets = Object.keys(assetMap).map((cryptocurrency) => ({
                cryptocurrency,
                holdings: assetMap[cryptocurrency],
                avgBuyPrice: (avgBuyPriceMap[cryptocurrency]).toFixed(2),
                price: currentPrices[cryptocurrency],
                holdingsUSD: (currentPrices[cryptocurrency] * assetMap[cryptocurrency]).toFixed(2),
                priceChange_1h: priceChange_1h[cryptocurrency],
                priceChange_24h: priceChange_24h[cryptocurrency],
                priceChange_7d: priceChange_7d[cryptocurrency],
                symbol: symbol[cryptocurrency],
                image: image[cryptocurrency],
                profit: ((currentPrices[cryptocurrency] - avgBuyPriceMap[cryptocurrency]) * assetMap[cryptocurrency]).toFixed(2),
                profitPercentage: ((currentPrices[cryptocurrency] - avgBuyPriceMap[cryptocurrency]) / avgBuyPriceMap[cryptocurrency] * 100).toFixed(2)
            }));

            // Оновлюємо стан портфоліо та активів
            setPortfolioTransactions(filteredTransactions);
            setPortfolioAssets(assets);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
}
