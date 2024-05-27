import React from 'react';
import { useNavigate } from 'react-router-dom';
import latestPublications from '../../data/publications';

const LatestPublications = ({ userProfile, openModal }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-lg flex w-full justify-start flex-col mt-10 px-10">
      <div className='flex flex-row pt-5 pb-10 items-center w-full justify-between'>
        <p className="text-left text-white font-light md:w-9/12 text-xl w-11/12 text-semibase font-semibold">Latest Publications</p>
        <div className='flex flex-row items-center cursor-pointer'>
          <p className='text-white font-semibold pr-3'>New post</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
            class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </div>
      </div>

      {latestPublications
        .filter((publication) => publication.author === userProfile.login)
        .map((publication, index) => (
          <div key={index} className="flex items-start flex-col">
            <div className="flex flex-row w-full">
              <div className="flex-shrink-0 w-14 h-14 bg-gray-600 rounded-full mr-4"></div>
              <div className="flex w-full flex-col pr-20">
                <div className="flex w-full flex-row items-center">
                  <p className="text-white font-medium">{publication.author} </p>
                  <p className="px-2 text-white font-medium"> · </p>
                  <p className="text-gray-300 text-sm font-light">{publication.date}</p>
                </div>
                <p onClick={() => {
                  navigate(`/publications/${publication._id}`);
                }} className="text-white font-light my-4">{publication.content}</p>

                <div className="flex w-full items-center mt-2 justify-between">
                  <div onClick={() => openModal(publication)} className="cursor-pointer flex items-center mr-4">
                    <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                      <line x1="12" y1="12" x2="12" y2="12.01" />
                      <line x1="8" y1="12" x2="8" y2="12.01" />
                      <line x1="16" y1="12" x2="16" y2="12.01" />
                    </svg>
                    <p className="text-white ml-1">Comment</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full bg-gray-500 h-px my-5" />
          </div>
        ))}
    </div>
  );
};

export default LatestPublications;



// import React from 'react';

// const LatestPublications = ({ userProfile, openModal }) => {
//   const latestPublications = userProfile.latestPublications || []; // Якщо latestPublications не існує, то пустий масив

//   return (
//     <div className="flex flex-col w-full items-center mt-8">
//       <h2 className="text-white text-2xl font-semibold mb-4">Latest Publications</h2>
//       {latestPublications.length === 0 ? (
//         <p className="text-white">No publications available.</p>
//       ) : (
//         latestPublications.map((publication, index) => (
//           <div key={index} className="w-full max-w-2xl mb-4">
//             <div className="flex flex-row items-start">
//               <div className="flex flex-col w-full">
//                 <p className="text-white font-semibold">{publication.author}</p>
//                 <p className="text-gray-400 text-sm">{publication.date}</p>
//                 <p className="text-white mt-2">{publication.content}</p>
//                 <button
//                   onClick={() => openModal(publication)}
//                   className="mt-2 text-gray-500 hover:text-white"
//                 >
//                   Add a comment
//                 </button>
//               </div>
//             </div>
//             {index < latestPublications.length - 1 && (
//               <hr className="w-full border-gray-600 mt-4 mb-4" />
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default LatestPublications;
