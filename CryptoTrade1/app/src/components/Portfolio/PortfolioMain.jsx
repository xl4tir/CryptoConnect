import { useState, useEffect } from "react";
import PortfolioTotalAssert from './PortfolioTotalAssert'
import PortfolioBaseStatistics from './PortfolioBaseStatistics'
import PortfolioMainInfo from './PortfolioMainInfo'
import { assertProcessing } from "../../utils/assertProcessing";



const PortfolioMain = ({ portfolio, coins }) => {
    const [portfolioTransactions, setPortfolioTransactions] = useState([]);
    const [portfolioAssets, setPortfolioAssets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        assertProcessing(portfolio, coins, setPortfolioTransactions, setPortfolioAssets, setIsLoading);
    }, []);


    return (
        <div>
            <PortfolioMainInfo portfolio={portfolio} portfolioAssets={portfolioAssets} coins = {coins}/>
            <PortfolioBaseStatistics portfolioAssets={portfolioAssets}/>
            <PortfolioTotalAssert portfolioAssets={portfolioAssets} />
        </div>
    );
};

export default PortfolioMain;