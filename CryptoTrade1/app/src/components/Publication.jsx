import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import publicationsData from '../data/publications';
import { fetchUserProfile, useFetchProfileEffect } from '../services/authUser';

import PublicationTabs from './MUI/PublicationTabs';

const Publication = () => {

    const [userProfile, setUserProfile] = useState(null);
    useFetchProfileEffect(setUserProfile);


    const { id } = useParams();
    const navigate = useNavigate();
    const [publication, setPublication] = useState(null);


    useEffect(() => {
        const foundPublication = publicationsData.find(pub => String(pub._id) === id);

        if (foundPublication) {
            setPublication(foundPublication);
        } else {
            navigate('/not-found');
        }
    }, [id, navigate]);


    if (!publication) {
        return <div>Loading...</div>;
    }



    if (!userProfile) {
        return <div>Loading...</div>; // або інша обробка стану "завантаження"
    }

    return (
        <div className="flex md:w-9/12 mx-auto w-full justify-center items-center  mt-10 px-10">
            <div className="flex items-start flex-col ">
                <p className="text-left mt-20 mb-2 text-white font-light  text-2xl w-11/12 text-semibase font-semibold">Post detatil</p>
                <div className="h-[1px] w-full bg-gray-600 my-5 " />
                <div className="flex flex-row w-full">
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-600 rounded-full mr-4"></div>
                    <div className="flex w-full flex-col pr-20">
                        <div className="flex w-full flex-row items-center">
                            <p className="text-white font-medium">{publication.author} </p>
                        </div>
                        <p className="text-white text-xl font-light my-4">{publication.content}</p>
                        <p className="text-gray-300 text-sm font-light mb-4">{publication.date} 2023 at 10:12 PM</p>

                        <div className="flex w-full items-center mt-2 justify-between">
                            <div className="cursor-pointer flex items-center mr-4">
                                <svg width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>comment-3</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke-width="0.00032" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-204.000000, -255.000000)" fill="#ffffff"> <path d="M228,267 C226.896,267 226,267.896 226,269 C226,270.104 226.896,271 228,271 C229.104,271 230,270.104 230,269 C230,267.896 229.104,267 228,267 L228,267 Z M220,281 C218.832,281 217.704,280.864 216.62,280.633 L211.912,283.463 L211.975,278.824 C208.366,276.654 206,273.066 206,269 C206,262.373 212.268,257 220,257 C227.732,257 234,262.373 234,269 C234,275.628 227.732,281 220,281 L220,281 Z M220,255 C211.164,255 204,261.269 204,269 C204,273.419 206.345,277.354 210,279.919 L210,287 L217.009,282.747 C217.979,282.907 218.977,283 220,283 C228.836,283 236,276.732 236,269 C236,261.269 228.836,255 220,255 L220,255 Z M212,267 C210.896,267 210,267.896 210,269 C210,270.104 210.896,271 212,271 C213.104,271 214,270.104 214,269 C214,267.896 213.104,267 212,267 L212,267 Z M220,267 C218.896,267 218,267.896 218,269 C218,270.104 218.896,271 220,271 C221.104,271 222,270.104 222,269 C222,267.896 221.104,267 220,267 L220,267 Z" id="comment-3" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                                <span className="text-white ml-2">{publication.comments}</span>
                            </div>

                            <div className="flex items-center mr-4 cursor-pointer">
                                <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.544"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrows-repeat</title> <path d="M10 7.75h16.188l-3.72 3.72c-0.134 0.136-0.218 0.322-0.218 0.528 0 0.415 0.336 0.751 0.751 0.751 0.207 0 0.394-0.083 0.529-0.219l5-5c0.025-0.026 0.017-0.064 0.038-0.093 0.040-0.052 0.098-0.088 0.124-0.151 0.013-0.050 0.020-0.108 0.020-0.167 0-0.011-0-0.021-0.001-0.032l0 0.002c0.009-0.041 0.014-0.087 0.014-0.135 0-0.004-0-0.008-0-0.011v0.001c-0.006-0.184-0.079-0.35-0.196-0.475l0 0-5-5c-0.136-0.135-0.323-0.218-0.529-0.218-0.415 0-0.751 0.336-0.751 0.751 0 0.206 0.083 0.393 0.218 0.528l3.721 3.72h-16.189c-0.219-0.021-0.473-0.033-0.729-0.033-4.345 0-7.884 3.454-8.020 7.766l-0 0.013c0 0.001 0 0.003 0 0.005 0 0.413 0.333 0.747 0.745 0.75h0.005c0.412-0 0.747-0.333 0.75-0.745v-0c0.002-0.255 0.122-6.251 7.25-6.255zM30.008 17.251h-0.008c-0.411 0.001-0.745 0.332-0.75 0.742v0c-0.004 0.255-0.16 6.251-7.25 6.257h-16.188l3.719-3.719c0.135-0.136 0.218-0.323 0.218-0.529 0-0.415-0.336-0.751-0.751-0.751-0.206 0-0.393 0.083-0.528 0.218l-5 5c-0.025 0.025-0.017 0.064-0.038 0.092-0.041 0.052-0.099 0.089-0.125 0.152-0.013 0.050-0.020 0.108-0.020 0.167 0 0.010 0 0.021 0.001 0.031l-0-0.001c-0.009 0.041-0.014 0.088-0.014 0.136 0 0.004 0 0.008 0 0.012v-0.001c0.006 0.184 0.080 0.351 0.197 0.475l-0-0 5 5c0.136 0.137 0.324 0.221 0.532 0.221 0.415 0 0.751-0.336 0.751-0.751 0-0.208-0.085-0.397-0.222-0.533l-3.72-3.719h16.189c0.219 0.021 0.473 0.033 0.73 0.033 4.345 0 7.884-3.454 8.019-7.767l0-0.012c0-0.001 0-0.002 0-0.003 0-0.411-0.331-0.745-0.742-0.75h-0z"></path> </g></svg>
                                <span className="text-white ml-2">{publication.reposts}</span>
                            </div>

                            <div className="flex items-center mr-4 cursor-pointer">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" id="add-reaction" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="Rectangle_3" data-name="Rectangle 3" width="24" height="24" fill="none"></rect> <path id="Oval" d="M8.4,0a8.4,8.4,0,0,0,0,16.8h0a8.4,8.4,0,0,0,8.4-8.4" transform="translate(2.4 4.8)" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1.2"></path> <path id="Oval-2" data-name="Oval" d="M0,0A4.807,4.807,0,0,0,1.042,1.557,4.785,4.785,0,0,0,4.436,2.963h0A4.785,4.785,0,0,0,7.83,1.557,4.807,4.807,0,0,0,8.872,0" transform="translate(6.364 15.037)" fill="none" stroke="#ffffff" stroke-miterlimit="10" stroke-width="1.2"></path> <circle id="Oval-3" data-name="Oval" cx="1.2" cy="1.2" r="1.2" transform="translate(7.2 9.6)" fill="#ffffff" stroke="#ffffff" stroke-width="1.2"></circle> <circle id="Oval-4" data-name="Oval" cx="1.2" cy="1.2" r="1.2" transform="translate(12 9.6)" fill="#ffffff" stroke="#ffffff" stroke-width="1.2"></circle> <path id="Line" d="M1.2,0V7.2" transform="translate(18 1.2)" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1.2"></path> <path id="Line-2" data-name="Line" d="M0,1.2H7.2" transform="translate(15.6 3.6)" fill="none" stroke="#ffffff" stroke-linecap="square" stroke-miterlimit="10" stroke-width="1.2"></path> </g></svg>
                                <span className="text-white ml-2">{publication.reactions}</span>
                            </div>

                            <div className="flex items-center cursor-pointer">
                                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-gray-600 my-5 " />

                <form className="w-full" onSubmit={(e) => { e.preventDefault(); }}>

                    <div className="flex flex-row w-full pt-2 mb-10">
                        <div className="flex-shrink-0 w-14 h-14 bg-gray-300 rounded-full mr-4"></div>
                        <div className="flex w-full flex-col">
                            <div className="flex w-full flex-row items-end">
                                <p className="text-white font-medium">{userProfile.login} </p>
                            </div>

                            <textarea
                                className="text-white blue-glassmorphism placeholder:text-white shadow-none border-0 font-light mb-4 mt-2 w-full  p-2 mb-4 rounded-md "
                                placeholder="Wtire your comment..."
                                //value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />


                            <div className='flex flex-row w-full justify-between items-center mt-2'>
                                <div>
                                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#ffffff"></ellipse> <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#ffffff"></ellipse> <path d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168" stroke="#ffffff" stroke-width="1.5"></path> <path d="M4.92847 4.92663C6.12901 3.72408 7.65248 2.81172 9.41185 2.34029C14.7465 0.910876 20.2299 4.0767 21.6593 9.41136C23.0887 14.746 19.9229 20.2294 14.5882 21.6588C9.25357 23.0882 3.7702 19.9224 2.34078 14.5877C1.86936 12.8284 1.89775 11.0528 2.33892 9.41186" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                </div>




                                <button
                                    className=" text-white bg-[#2952e3] py-3 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                                    type="submit"
                                    onClick={() => handleCommentSubmit(comment)}
                                >
                                    Send a comment
                                </button>
                            </div>
                        </div>
                    </div>




                </form>
                <div className="h-[1px] w-full bg-gray-600  " />
                <PublicationTabs publicationId={publication._id} />

            </div>
        </div>
    );
};

export default Publication;
