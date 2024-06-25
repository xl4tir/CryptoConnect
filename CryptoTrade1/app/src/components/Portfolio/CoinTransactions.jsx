import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FiMinusCircle } from "react-icons/fi";

const CoinTransactions = ({ transactions, coin }) => {
    return (
        <div className="coin-transactions">
            <h1 className='font-semibold pt-10 text-lg'>Transactions</h1>
            <table style={{ width: '900px' }} className="table-auto w-full mt-4 text-right">
                <thead>
                    <tr className="text-xs text-sm border-y border-y-gray-600 h-10">
                        <th className="text-left">Type</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Commission</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => {
                        const formattedDate = new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                        }).format(new Date(transaction.purchaseDate));
                        const isBuy = transaction.operation;
                        return (
                            <tr key={index} className="text-sm border-y border-y-gray-600 h-16">
                                <td className="text-left font-medium">
                                    <div className="flex flex-row items-center gap-2">
                                        {isBuy ? (
                                            <FiPlusCircle size={23} className="text-green-500" />
                                        ) : (
                                            <FiMinusCircle size={23} className="text-red-500" />
                                        )}
                                        <div className="flex flex-col">


                                            <p>{isBuy ? 'Buy' : 'Sell'}</p>
                                            <p className="text-xs">
                                                {formattedDate}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-medium">${transaction.purchasePrice}</td>
                                <td>
                                    <div className="flex flex-col font-medium">
                                        <p >
                                           {isBuy ? `+  $${(transaction.amount * transaction.purchasePrice).toFixed(2)}` : `- $${(transaction.amount * transaction.purchasePrice).toFixed(2)}`}
                                        </p>
                                        <p className={isBuy ? 'text-green-500 text-xs' : 'text-red-500 text-xs'}>
                                            {isBuy ? `+ ${transaction.amount} ${coin.symbol}` : `- ${transaction.amount} ${coin.symbol}`}
                                        </p>
                                    </div>
                                </td>
                                <td>--</td>

                                <td>
                                    <div className="flex flex-row justify-end items-center gap-2">
                                        <FiEdit2 size={18} /> <AiOutlineDelete size={20} />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default CoinTransactions;
