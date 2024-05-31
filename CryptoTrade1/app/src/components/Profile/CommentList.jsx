// CommentList.js
import React from 'react';
import comments from '../data/comments';

const CommentList = ({ publicationId }) => {
    const publicationComments = comments.filter(comment => comment.publicationId === publicationId);

    return (
        <div className="max-w-screen-lg flex w-full justify-start flex-col mt-10 px-10">
            {publicationComments.map(comment => (
                <div className="flex items-start flex-col ">
                    <div className="flex flex-row w-full">
                        <div className="flex-shrink-0 w-14 h-14 bg-gray-600 rounded-full mr-4"></div>
                        <div className="flex w-full flex-col pr-20">
                            <div className="flex w-full flex-row items-center">
                                <p className="text-white font-medium">{comment.author} </p>
                                <p className="px-2 text-white font-medium"> · </p>
                                <p className="text-gray-300 text-sm font-light">{comment.date}</p>
                            </div>
                            <p className="text-white font-light my-4">{comment.content}</p>


                            <div className="flex w-full items-center mt-2 justify-between">
                                <div className="cursor-pointer flex items-center mr-4">
                                    <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />  <line x1="12" y1="12" x2="12" y2="12.01" />  <line x1="8" y1="12" x2="8" y2="12.01" />  <line x1="16" y1="12" x2="16" y2="12.01" /></svg>
                                    <span className="text-white ml-2">{comment.comments}</span>
                                </div>

                                <div className="flex items-center mr-4 cursor-pointer">
                                    <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />  <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3-3l3-3" /></svg>
                                    <span className="text-white ml-2">{comment.reposts}</span>
                                </div>

                                <div className="flex items-center mr-4 cursor-pointer">
                                    <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                                    <span className="text-white ml-2">{comment.reactions}</span>
                                </div>

                                <div className="flex items-center cursor-pointer">
                                    <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="5" y1="5" x2="5" y2="21" />  <line x1="19" y1="5" x2="19" y2="14" />  <path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0" />  <path d="M5 14a5 5 0 0 1 7 0a5 5 0 0 0 7 0" /></svg>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="h-[1px] w-full bg-gray-600 my-5 " />
                </div>

            ))}
        </div>
    );
};

export default CommentList;


