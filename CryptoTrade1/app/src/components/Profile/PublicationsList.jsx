import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';
import latestPublications from '../../data/publications';

const PublicationsList = ({ userProfile }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);

  const openModal = (publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPublication(null);
  };

  return (
    <div className="max-w-screen-lg flex w-full justify-start flex-col">

      {latestPublications.map((publication, index) => (
        <div key={index} className="flex items-start flex-col">
          <div className="flex flex-row w-full">
            <div className="flex-shrink-0 w-14 h-14 bg-gray-600 rounded-full mr-4"></div>
            <div className="flex w-full flex-col pr-20">
              <div className="flex w-full flex-row items-center">
                <p className="text-white font-medium">{publication.author}</p>
                <p className="px-2 text-white font-medium"> · </p>
                <p className="text-gray-300 text-sm font-light">{publication.date}</p>
              </div>
              <p
                onClick={() => {
                  navigate(`/publications/${publication._id}`);
                }}
                className="text-white font-light mt-1 mb-4"
              >
                {publication.content}
              </p>

              <div className="flex w-full items-center text-sm justify-between ">

                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <p className="ml-3">34</p>
                </div>

                <div
                  onClick={() => openModal(publication)}
                  className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                  <p className="text-white ml-3">54</p>
                </div>

                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                  </svg>
                  <p className="text-white ml-3">12</p>
                </div>

                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                  </svg>

                  <p className="text-white ml-3">34</p>
                </div>

                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>

   
                </div>

              </div>
            </div>
          </div>
          <div className="flex w-full bg-white opacity-10 h-px my-4" />
        </div>
      ))}

      <div className="flex flex-row pt-5 pb-10 items-center w-full justify-between">
        <div className="flex flex-row items-center cursor-pointer">
          <p className="text-white font-semibold pr-3">New post</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </div>
      </div>

      <CommentModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        publication={selectedPublication}
      />
    </div>
  );
};

export default PublicationsList;
