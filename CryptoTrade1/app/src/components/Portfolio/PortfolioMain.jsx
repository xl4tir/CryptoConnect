import { useState, useEffect } from "react";
import PortfolioTotalAssert from './PortfolioTotalAssert';
import PortfolioBaseStatistics from './PortfolioBaseStatistics';
import PortfolioMainInfo from './PortfolioMainInfo';
import CoinInfo from './CoinInfo'; // New component to display coin details
import CoinTransactions from './CoinTransactions'; // New component to display coin transactions
import { assertProcessing } from "../../utils/assertProcessing";
import Loader from '../Loader';

const PortfolioMain = ({ portfolio, coins, updatePortfolios }) => {
    const [portfolioTransactions, setPortfolioTransactions] = useState([]);
    const [portfolioAssets, setPortfolioAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        assertProcessing(portfolio, coins, setPortfolioTransactions, setPortfolioAssets, setIsLoading);
    }, [portfolio, coins]);

    const updatePortfolio = () => {
        assertProcessing(portfolio, coins, setPortfolioTransactions, setPortfolioAssets, setIsLoading);
        updatePortfolios();
    };

    return (
        <div>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader />
                </div>
            ) : (
                <>
                    {!selectedCoin ? (
                        <>
                            <PortfolioMainInfo 
                                portfolio={portfolio} 
                                portfolioAssets={portfolioAssets} 
                                coins={coins} 
                                updatePortfolio={updatePortfolio} 
                                onCoinClick={setSelectedCoin} // Pass the setSelectedCoin function
                            />
                            <PortfolioBaseStatistics portfolioAssets={portfolioAssets} />
                            <PortfolioTotalAssert portfolioAssets={portfolioAssets} onCoinClick={setSelectedCoin} />
                        </>
                    ) : (
                        <div className="w-full">
                            {/* <button onClick={() => setSelectedCoin(null)} className="mb-4 bg-gray-200 p-2 rounded">Back</button> */}
                            <CoinInfo coin={selectedCoin}  onCoinClick={setSelectedCoin}/>
                            <CoinTransactions coin={selectedCoin} transactions={portfolioTransactions.filter(t => t.cryptocurrency === selectedCoin.cryptocurrency)} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PortfolioMain;
