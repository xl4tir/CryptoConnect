import React, {useEffect, useState} from "react";
import { contractABI_Transactions, contractAddress_Transactions } from '../utils/constants'
import {ethers} from 'ethers';


export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress_Transactions, contractABI_Transactions, signer);


    return transactionContract;
}


export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo: '', amont: '', keyword:'', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [TransactionCount, setTransactionCount] = useState(localStorage.getItem('TransactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) =>{
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    const getAllTransactions = async () =>{
        try {
            if (ethereum) {
              const transactionsContract = getEthereumContract();
      
              const availableTransactions = await transactionsContract.getAllTransactions();
      
              const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
              }));
      
              console.log(structuredTransactions);
      
              setTransactions(structuredTransactions);
            } else {
              console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    

    
    const checkIfWalletIsConnected = async () => {
        try{

            if(!ethereum) return alert ("Please install metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});

            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }else{
                console.log("No accounts found");
            }

            console.log(accounts);

        }catch(error){
            console.log(error);

            throw new Error("Nooo ethereum object");
        }
    
    }

    const checkIfTransactionsExist = async () => {
        try {
            if (!ethereum) {
                console.log("Ethereum object is undefined");
                return;
            }
    
            const transactionContract = getEthereumContract();
            if (!transactionContract) {
                console.log("Failed to get transaction contract");
                return;
            }
    
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                // proceed with transactions
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const connectWallet = async ()=>{
        try{
            if(!ethereum) return alert ("Please install metamask");
        

        const accounts = await ethereum.request({method:'eth_requestAccounts'});

        setCurrentAccount(accounts[0]);
        window.location.reload();
        }catch (error){
            console.log(error);
            throw new Error("Nooo ethereum object");
        }
    }


    const sendTransaction = async () =>{
        try{
            if (!ethereum) {
                return alert("Please install MetaMask or connect your wallet.");
            }
            

            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)
            setIsLoading(true);
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedAmount._hex, // 21000 GWEI
                }],
              });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount()
            setTransactionCount(transactionCount.toNumber())
            
            window.location.reload();

        }catch(error){
            console.log(error);
            throw new Error("Nooo ethereum object");
        }
    }


    useEffect(() =>{
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, [])


    return(
        <TransactionContext.Provider value={{connectWallet, currentAccount, formData, handleChange, sendTransaction, transactions, isLoading}}>
            {children}
        </TransactionContext.Provider>
    )

}