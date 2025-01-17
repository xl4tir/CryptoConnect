import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReactModal from 'react-modal';
import { AuthContext } from '../../context/authContext';
import PortfolioService from '../../services/portfolioService';
import PortfolioMain from './PortfolioMain';
import { fetchCoinsData } from "../../services/getCoinsApi";
import { MdCurrencyBitcoin } from "react-icons/md";
import Loader from '../Loader';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ width: '100%' }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0)', width: 'xl', maxWidth: 'xl', minWidth: 'xl', padding: '0 24px' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function PortfolioTracker({ user_id }) {
    const [value, setValue] = React.useState(0);
    const [userPortfolios, setUserPortfolios] = React.useState([]);
    const [coins, setCoins] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [newPortfolioName, setNewPortfolioName] = React.useState('');
    const { user: currentUser } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const coinsData = await fetchCoinsData();
                setCoins(coinsData);
                console.log('Завантаження даних про монети');
            } catch (error) {
                console.error('Помилка при завантаженні даних про монети', error);
            }

            try {
                const portfolios = await PortfolioService.getAllPortfoliosByUserId(user_id);
                console.log(currentUser);
                setUserPortfolios(portfolios);
            } catch (error) {
                console.error('Помилка при завантаженні портфоліо', error);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [user_id]);

    const handleCreatePortfolio = async () => {
        if (newPortfolioName.trim()) {
            try {
                await PortfolioService.createPortfolio({ name: newPortfolioName, user_id });
                const portfolios = await PortfolioService.getAllPortfoliosByUserId(user_id);
                setUserPortfolios(portfolios);
                setNewPortfolioName('');
                setIsModalOpen(false);
                setValue(portfolios.length - 1); // Set the new tab as active
            } catch (error) {
                console.error('Помилка при створенні портфоліо', error);
            }
        }
    };

    const updatePortfolios = async () => {
        try {
            const portfolios = await PortfolioService.getAllPortfoliosByUserId(user_id);
            setUserPortfolios(portfolios);
        } catch (error) {
            console.error('Помилка при оновленні портфоліо', error);
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const canEdit = currentUser && currentUser._id === user_id;

    const maxLength = 24;
    const isOverLimit = newPortfolioName.length > maxLength;
    const charactersLeft = newPortfolioName.length;

    return (
        <div className="md:w-max mx-auto w-full justify-center items-center pb-24 mt-24 px-10 tracking-wider">
            {isLoading ? (
                <div className='flex justify-center items-center h-screen'>
                    <Loader />
                </div>
            ) : (
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.inherit', display: 'flex', minHeight: 500, width: 'xl', maxWidth: 'xl', minWidth: 'xl' }}
                >
                    <Tabs className='text-white'
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        textColor="inherit"
                        indicatorColor="secondary"
                        onChange={handleChange}
                        aria-label="icon position Vertical tabs"
                        sx={{ borderRight: 1, borderColor: 'rgba(255, 255, 255, 0.1)', width: '250px', maxWidth: '250px', minWidth: '250px' }}
                    >
                        {userPortfolios.length === 0 ? (
                            <Tab iconPosition="start" label="Empty" {...a11yProps(0)} />
                        ) : (
                            userPortfolios.map((portfolio, index) => (
                                <Tab iconPosition="start" icon={<MdCurrencyBitcoin size={38} />}
                                    sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        justifyItems: "self-start",
                                        justifyContent: "flex-start",
                                        alignItems: 'center',
                                        textAlign: "left", fontSize: '14px', textTransform: 'none'
                                    }}
                                    key={portfolio.id} label={portfolio.name} {...a11yProps(index)} />
                            ))
                        )}
                        {canEdit && (
                            <button className="text-pink-500 px-4 flex flex-row items-center justify-start" onClick={() => setIsModalOpen(true)}>
                                <p className="text-3xl mr-1 font-light">+</p>
                                <div className="text-sm font-medium">
                                    <p>Create portfolio</p>
                                </div>
                            </button>
                        )}
                    </Tabs>

                    {userPortfolios.length === 0 ? (
                        <TabPanel value={value} index={0} className='text-white'>
                            <div className='pt-5 text-xl font-medium flex flex-col justify-center gap-2 items-center' style={{width : "900px"}}><Loader /> Hey bro, it's pretty empty here, so 
                                <label onClick={() => setIsModalOpen(true)} className='text-blue-400 text-3xl text-semibold cursor-pointer' htmlFor="">+ Create a new portfolio</label></div>
                        </TabPanel>
                    ) : (
                        userPortfolios.map((portfolio, index) => (
                            <TabPanel
                                key={portfolio.id}
                                value={value}
                                index={index}
                                className='text-white'
                                sx={{ width: 'xl', maxWidth: 'xl', minWidth: 'xl', padding: '0px' }}
                            >
                                <PortfolioMain portfolio={portfolio} coins={coins} updatePortfolios={updatePortfolios} />
                            </TabPanel>
                        ))
                    )}
                </Box>
            )}

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Create Portfolio"
                className="max-w-md flex items-center blue-glassmorphism-modalWindow bg-opacity-100 w-full p-8 mx-auto my-60 rounded-xl"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
                <div className="flex flex-col w-full">
                    <div className='flex flex-row items-start justify-between'>
                        <h2 className="text-white text-xl font-semibold mb-6">Create Portfolio</h2>
                        <svg onClick={() => setIsModalOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white"
                            className="size-7 cursor-pointer hover:opacity-70">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <label className="text-white text-sm font-medium" htmlFor="">Portfolio Name</label>
                    <input
                        type="text"
                        value={newPortfolioName}
                        onChange={(e) => setNewPortfolioName(e.target.value)}
                        className={`my-2 w-full rounded-md p-2 outline-none bg-blue-300/10 text-white border-transparent focus:ring-0  ${isOverLimit ? 'focus:border focus:border-red-500 bg-red-400/20' : 'focus:border-white/20'}`}
                    />
                    <label className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-white/80'}`} htmlFor="">{charactersLeft}/24 characters</label>
                    <button
                        onClick={handleCreatePortfolio}
                        disabled={isOverLimit}
                        className={`mt-4 p-2 rounded-md bg-blue-600 ${isOverLimit ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-500'} text-white`}
                    >
                        Save
                    </button>
                </div>
            </ReactModal>
        </div>
    );
}
