

const PortfolioTotalAssert = ({  portfolioAssets }) => {





    return (
        <div className="">
            <h1 className='font-semibold pt-5 text-lg'>Assets</h1>
            <table style={{ width: '900px' }} class="table-auto w-full mt-8 text-right">
                <thead>

                    <tr className="text-xs text-sm border-y border-y-gray-600 h-10">
                        <th className="text-left">Name</th>
                        <th>Price</th>
                        <th>1h%</th>
                        <th>24h%</th>
                        <th>7d</th>
                        <th>Holdings</th>
                        <th>Avg. Buy Price</th>
                        <th>Profit/Loss</th>
                    </tr>
                </thead>
                <tbody className="">
                    {portfolioAssets.map((asset, index) => (
                        <tr key={index} className="text-sm border-y border-y-gray-600 h-16">
                            <td className="text-left font-semibold">
                                <div className="flex items-center">
                                    <img className="w-6" src={asset.image} alt='crypto' /><p className="m-2">{asset.cryptocurrency} </p><label className="text-gray-500">{asset.symbol}</label>
                                </div>
                            </td>
                            <td className="font-medium">${asset.price}</td>
                            <td>
                                {asset.priceChange_1h > 0 ? (
                                    <div className='flex items-center justify-end '>

                                        <svg className="ml-2 mr-0.5 fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                            width="10px" height="10px"
                                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                        </svg>
                                        <p className='text-xs font-medium text-green-400 '>
                                            {asset.priceChange_1h}%
                                        </p>

                                    </div>
                                ) : (
                                    <div className='flex items-center justify-end'>
                                        <svg className="ml-2 mr-0.5 fill-red-600" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                            width="10px" height="10px"
                                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"
                                            transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                        </svg>
                                        <p className='text-xs font-medium text-red-600 '>
                                            {asset.priceChange_1h}%
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td>
                                {asset.priceChange_24h > 0 ? (
                                    <div className='flex items-center justify-end '>

                                        <svg className="ml-2 mr-0.5 fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                            width="10px" height="10px"
                                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                        </svg>
                                        <p className='text-xs font-medium text-green-400 '>
                                            {asset.priceChange_24h}%
                                        </p>

                                    </div>
                                ) : (
                                    <div className='flex items-center justify-end'>
                                        <svg className="ml-2 mr-0.5 fill-red-600" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                            width="10px" height="10px"
                                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"
                                            transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                        </svg>
                                        <p className='text-xs font-medium text-red-600 '>
                                            {asset.priceChange_24h}%
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td>
                                {asset.priceChange_7d > 0 ? (
                                    <div className='flex items-center justify-end '>

                                        <svg className="ml-2 mr-0.5 fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                            width="10px" height="10px"
                                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                        </svg>
                                        <p className='text-xs font-medium text-green-400 '>
                                            {asset.priceChange_7d}%
                                        </p>

                                    </div>
                                ) : (
                                    <div className='flex items-center justify-end'>
                                        <svg className="ml-2 mr-0.5 fill-red-600" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                            width="10px" height="10px"
                                            viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"
                                            transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                        </svg>
                                        <p className='text-xs font-medium text-red-600 '>
                                            {asset.priceChange_7d}%
                                        </p>
                                    </div>
                                )}
                            </td>
                            <td>
                                <div className="flex flex-col font-medium">
                                    <p>${asset.holdingsUSD}</p>
                                    <p className="text-gray-400  text-xs">{asset.holdings} {asset.symbol}</p>
                                </div>
                            </td>
                            <td className="font-medium">${asset.avgBuyPrice}</td>
                            <td>
                                {asset.profit > 0 ? (
                                    <div className="flex flex-col font-medium">
                                        <p>+ ${asset.profit}</p>
                                        <div className='flex items-center justify-end'>
                                            <svg className="ml-2 mr-0.5 fill-green-400" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                                width="10px" height="10px"
                                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(360)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                            </svg>
                                            <p className='text-xs font-medium text-green-400 '>
                                                {asset.profitPercentage}%
                                            </p>
                                        </div>
                                    </div>
                                ) : (

                                    <div className="flex flex-col font-medium">
                                        <p>- ${asset.profit * (-1)}</p>
                                        <div className='flex items-center justify-end'>
                                            <svg className="ml-2 mr-0.5 fill-red-600" fill="#ff0000" xmlns="http://www.w3.org/2000/svg"
                                                width="10px" height="10px"
                                                viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve" transform="rotate(180)" stroke="#ff0000" stroke-width="0.0005200000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="5.4079999999999995"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g>
                                            </svg>
                                            <p className='text-xs font-medium text-red-600 '>
                                                {asset.profitPercentage * (-1)}%
                                            </p>
                                        </div>
                                    </div>

                                )}

                            </td>
                        </tr>

                    ))}


                </tbody>
            </table>
        </div >
    );


}
export default PortfolioTotalAssert;