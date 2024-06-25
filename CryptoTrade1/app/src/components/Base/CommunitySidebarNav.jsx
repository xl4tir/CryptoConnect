import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { SlFeed } from "react-icons/sl";
import { MdOutlineNumbers } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { AuthContext } from "../../context/authContext";


const CommunitySidebarNav = () => {
    const {  user } = useContext(AuthContext);

    if(!user){
       return (<div>loading</div>)
    }
    return (
        <div className="w-56  text-white mt-8">
            <div className="text-lg font-bold mb-4 flex flex-row items-center gap-3">
                <AiOutlineDeploymentUnit size={35} />
                COMMUNITY</div>
            <nav>
                <ul>
                    <li className="mb-2 hover:bg-gray-700/40  rounded ">
                        <Link className='flex flex-row p-5 items-center font-medium gap-3 tracking-wider '
                            to="/feed">
                            <SlFeed style={{ strokeWidth: '40' }} size={20} />
                            Feed
                        </Link>
                    </li>

                    <li className="mb-2 hover:bg-gray-700/40  rounded">
                        <Link className='flex flex-row p-5 items-center font-medium gap-3 tracking-wider '
                            to="/topics"><MdOutlineNumbers size={25} /> Topics</Link>
                    </li>
                    <li className="mb-2 hover:bg-gray-700/40  rounded">
                        <Link className='flex flex-row p-5 items-center font-medium gap-3 tracking-wider '
                            to="/search"><FiSearch size={25} /> Search</Link>
                    </li>
                    <li className="mb-2 hover:bg-gray-700/40  rounded">
                        <Link className='flex flex-row p-5 items-center font-medium gap-3 tracking-wider '
                            to={`/profile/${user._id}`}><FaRegUser size={25} /> My Page</Link>
                    </li>
                    <li className="mb-2 hover:bg-gray-700/40  rounded">
                        <Link className='flex p-5 flex-row items-center font-medium gap-3 tracking-wider '
                            to="/more"><IoIosMore size={25} /> More</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default CommunitySidebarNav;
