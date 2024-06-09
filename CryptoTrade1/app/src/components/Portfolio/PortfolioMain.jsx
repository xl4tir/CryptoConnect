import { useState, useEffect } from "react";
import PortfolioTotalAssert from './PortfolioTotalAssert'
import PortfolioBaseStatistics from './PortfolioBaseStatistics'
import PortfolioMainInfo from './PortfolioMainInfo'
import { assertProcessing } from "../../utils/assertProcessing";
import Loader from '../Loader'; // Імпортуйте компонент Loader

const PortfolioMain = ({ portfolio, coins, updatePortfolios }) => {
    const [portfolioTransactions, setPortfolioTransactions] = useState([]);
    const [portfolioAssets, setPortfolioAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        assertProcessing(portfolio, coins, setPortfolioTransactions, setPortfolioAssets, setIsLoading);
    }, [portfolio, coins]); // Додайте portfolio і coins як залежності

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
                    <PortfolioMainInfo 
                        portfolio={portfolio} 
                        portfolioAssets={portfolioAssets} 
                        coins={coins} 
                        updatePortfolio={updatePortfolio} 
                    />
                    <PortfolioBaseStatistics portfolioAssets={portfolioAssets} />
                    <PortfolioTotalAssert portfolioAssets={portfolioAssets} />
                </>
            )}
        </div>
    );
};

export default PortfolioMain;
