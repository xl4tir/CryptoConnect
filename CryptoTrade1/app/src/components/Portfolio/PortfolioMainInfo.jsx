import AddTransaction from './AddTransaction'

const PortfolioMainInfo = ({ portfolio, portfolioAssets, coins }) => {


    let totalHoldingsUSD = 0;
    let totalProfit24h = 0;
    let totalpercentageChange24h = 0;

    if (portfolioAssets && portfolioAssets.length > 0) {
        portfolioAssets.forEach((asset) => {
            if (asset.hasOwnProperty('holdingsUSD') && asset.hasOwnProperty('price') && asset.hasOwnProperty('priceChange_24h')) {
                const holdingsUSD = parseFloat(asset.holdingsUSD);
                const holdings = parseFloat(asset.holdings);
                const currentPrice = parseFloat(asset.price);
                const priceChange24h = parseFloat(asset.priceChange_24h) / 100;

                // Розраховуємо прибуток/збиток для кожного активу за останні 24 години
                const profit24h = holdings * (currentPrice - currentPrice / (1 + priceChange24h));
                const percentageChange24h = ((holdings * currentPrice - holdings * currentPrice / (1 + priceChange24h)) / (holdings * currentPrice / (1 + priceChange24h))) * 100;

                totalProfit24h += profit24h;
                totalHoldingsUSD += holdingsUSD;
                totalpercentageChange24h += percentageChange24h;
            }
        });

        totalHoldingsUSD = totalHoldingsUSD.toFixed(2);
        totalProfit24h = totalProfit24h.toFixed(2);
        totalpercentageChange24h = totalpercentageChange24h.toFixed(2);
    }


    return (
        <div className="flex flex-row w-full items-center justify-between">
            <div>
                <h1 className="text-base  text-gray-300 py-1">{portfolio.name}</h1>
                <h1 className="text-3xl tracking-wider font-bold text-white py-1">${totalHoldingsUSD}</h1>
                {totalProfit24h > 0 ? (
                    <div className='flex items-center font-light'>
                        <h1 className="text-sm font-light tracking-wider text-green-400 py-1">+ ${totalProfit24h} </h1>
                        <svg class="fill-green-400 ml-2 mr-1" fill="#00ff55" xmlns="http://www.w3.org/2000/svg"
                            width="12px" height="12px"
                            viewBox="0 0 52.00 52.00" enable-background="new 0 0 52 52" xml:space="preserve" stroke="#00ff55" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g></svg>
                        <h1 className="text-sm font-light tracking-wider text-green-400 py-1">{totalpercentageChange24h}% (24h)</h1>
                    </div>
                ) : (
                    <div className='flex items-center font-light'>
                        <h1 className="text-sm font-light tracking-wider text-red-600 py-1">- ${totalProfit24h * (-1)} </h1>
                        <svg class="fill-red-600 ml-2 mr-1" fill="#00ff55" xmlns="http://www.w3.org/2000/svg"
                            width="12px" height="12px"
                            viewBox="0 0 52.00 52.00" transform="rotate(180)" enable-background="new 0 0 52 52" xml:space="preserve" stroke="#00ff55" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g></svg>
                        <h1 className="text-sm font-light tracking-wider text-red-600 py-1">{totalpercentageChange24h *(-1)}% (24h)</h1>
                    </div>
                )}
            </div>

            <AddTransaction coins={coins} portfolio={portfolio}/>
        </div>


    );
};

export default PortfolioMainInfo;