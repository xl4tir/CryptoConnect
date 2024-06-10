import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';
import NewPostModal from './NewPostModal';
import RepostModal from '../Publication/RepostModal';
import { getPostsByUserId, createPost, createRepost } from '../../services/postService'; // Додано імпорт createRepost
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { createComment } from '../../services/commentsService'; 
import Loader from '../Loader';
import { Toaster, toast } from 'react-hot-toast';


const PublicationsList = ({ user, currentUser }) => {
  const navigate = useNavigate();
  const [isModalCommentOpen, setIsModalCommentOpen] = useState(false);
  const [isModalPostOpen, setIsModalPostOpen] = useState(false);
  const [isModalRepostOpen, setIsModalRepostOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [selectedRepost, setSelectedRepost] = useState(null);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
 


  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getPostsByUserId(user._id);
        setPublications(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
        setError('Failed to load publications');
      } finally {
        setLoading(false);
   
      }
    };

    fetchPublications();
  }, [user]);

  const openModalComment = (publication) => {
    setSelectedPublication(publication);
    setIsModalCommentOpen(true);
    console.log(isModalCommentOpen)
  };

  const closeModalComment = () => {
    setIsModalCommentOpen(false);
    setSelectedPublication(null);
  };

  const openModalPost = () => {
    setIsModalPostOpen(true);
  };

  const closeModalPost = () => {
    setIsModalPostOpen(false);
  };

  const openModalRepost = (publication) => {
    console.log(publication)
    setSelectedRepost(publication);
    setNewPostText('');
    setIsModalRepostOpen(true);
  };

  const closeModalRepost = () => {
    setSelectedRepost(null);
    setIsModalRepostOpen(false);
    
  };

  const handleRepost = async () => {
    try {
      console.log({ content: newPostText })
      await createRepost(selectedRepost._id,  { content: newPostText } );
      const data = await getPostsByUserId(user._id);
      setPublications(data);
      setIsModalRepostOpen(false);
      toast.success('Repost created successfully!', { className: 'blue-glassmorphism-toast' });
    } catch (error) {
      console.error('Error reposting:', error);
      setError('Failed to repost');
      toast.error('Failed to repost. Please try again later.', { className: 'blue-glassmorphism-toast' });
    }
  };

  const handleSubmitPost = async () => {
    try {
      console.log({ content: newPostText })
      await createPost({ content: newPostText });
      const data = await getPostsByUserId(user._id);
      setPublications(data);
      setIsModalPostOpen(false);
      setNewPostText('');
      toast.success('Post created successfully!', { className: 'blue-glassmorphism-toast' });
    } catch (error) {
      toast.error('Failed to create post. Please try again later.', { className: 'blue-glassmorphism-toast' });
      console.error('Error creating post:', error);
      setError('Failed to create post');
    }
  };

  const handleCreateComment = async () => {
    try {
      const commentData = {
        post_id: selectedPublication._id, // замініть на реальний ID посту
        content: newCommentText,
      };
      await createComment(commentData);
      setIsModalCommentOpen(false);
      toast.success('Comment created successfully!', { className: 'blue-glassmorphism-toast' });
    } catch (error) {
      console.error('Error creating comment:', error);
      setError('Failed to create comment');
      toast.error('Failed to create comment. Please try again later.', { className: 'blue-glassmorphism-toast' });
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = (now - date) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInYears = now.getFullYear() - date.getFullYear();

    if (diffInSeconds < 60) {
      return `${Math.floor(diffInSeconds)} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInDays < 2) {
      return 'yesterday';
    } else if (diffInDays < 365) {
      return `${date.toLocaleString('default', { month: 'long' }).slice(0, 5)} ${date.getDate()}`;
    } else if (diffInYears === 1) {
      return `${date.toLocaleString('default', { month: 'long' }).slice(0, 5)} ${date.getDate()}, ${date.getFullYear()}`;
    } else {
      return `${diffInYears} years ago`;
    }
  };

  if (loading) {
    return <div className='flex max-w-screen-lg items-center justify-center w-screen m-auto'><Loader></Loader></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-screen-md flex w-screen justify-start flex-col">
      <Toaster></Toaster>
      {publications.map((publication, index) => (
        <div key={index} className="flex items-start flex-col">
          <div className="flex flex-row w-full">
            <img
              src={getUserProfilePhotoURL(publication.user_id.profile.profilePhoto)}
              alt={`${publication.user_id.profile.name}'s profile`}
              className="flex-shrink-0 w-14 h-14  rounded-full mr-4"
            />
            <div className="flex w-full flex-col pr-20">
              <div className="flex w-full flex-row items-center">
                <p className="text-white font-medium">{publication.user_id.profile.name} <span className='text-gray-300 pl-1'>@{publication.user_id.profile.username}</span></p>
                <p className="px-2 text-white font-medium"> · </p>
                <p className="text-gray-300 text-sm font-light">{formatDate(publication.created_at)}</p>
              </div>
              <p
                onClick={() => {
                  navigate(`/publications/${publication._id}`);
                }}
                className="text-white font-light pt-2 pb-4 cursor-pointer"
              >
                {publication.content}
              </p>
              {publication.original_post && (
                <div className="flex w-full flex-col mb-4 pr-20 py-4 border border-white border-opacity-40 rounded-lg pl-4">

                  <div className='flex flex-row'>
                    <img
                      src={getUserProfilePhotoURL(publication.user_id.profile.profilePhoto)}
                      alt={`${publication.user_id.profile.name}'s profile`}
                      className="flex-shrink-0 w-8 h-8  rounded-full mr-3"
                    />
                    <div className="flex w-full flex-row items-center">
                      <p className="text-white text-sm font-medium">{publication.original_post.user_id.profile.name} <span className='text-gray-300 pl-1'>@{publication.original_post.user_id.profile.username}</span></p>
                      <p className="px-2 text-white text-sm font-medium"> · </p>
                      <p className="text-gray-300 text-xs font-light">{formatDate(publication.original_post.created_at)}</p>
                    </div>
                  </div>

                  <p className="text-white font-light pt-3 text-sm  cursor-pointer">
                      {publication.original_post.content}
                    </p>

                </div>
              )}
              <div className="flex w-full items-center text-sm justify-between">
                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <p className="ml-3">34</p>
                </div>

                <div
                  className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4"
                  onClick={() => openModalComment(publication)}>
                
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                  <p className="text-white ml-3">{publication.comments.length}</p>
                </div>

                <div
                  className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4"
                  onClick={() => openModalRepost(publication)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                  </svg>
                  <p className="text-white ml-3">{publication.reposts.length}</p>
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

      <div
        className="flex max-w-screen-md w-full flex-row-reverse bottom-20 fixed z-40 "
      >
        <div className="flex items-center rounded-full bg-blue-600 hover:bg-blue-700 mr-20 flex-row justify-end flex-wrap-reverse items-center cursor-pointer ">
        {user._id === currentUser._id && (
          <svg onClick={() => setIsModalPostOpen(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white"
            className="size-10 m-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
          )}

        </div>
      </div>
      <RepostModal // Змінено назву модального вікна
        isModalRepostOpen={isModalRepostOpen}
        onRequestClose={closeModalRepost}
        onRepost={handleRepost}
        publication={selectedRepost}
        newPostText={newPostText}
        onNewPostTextChange={setNewPostText}
        user={currentUser}
        formatDate={formatDate}
      />


      <NewPostModal
        isOpenNewPostModal={isModalPostOpen}
        onRequestClose={closeModalPost}
        onSubmitPost={handleSubmitPost}
        newPostText={newPostText}
        onNewPostTextChange={setNewPostText}
        user={currentUser}
      />

      <CommentModal
        isModalCommentOpen={isModalCommentOpen}
        onRequestClose={closeModalComment}
        onComment = {handleCreateComment}
        publication={selectedPublication}
        newCommentText={newCommentText}
        onNewCommentTextChange = {setNewCommentText}
        user={currentUser}
        formatDate={formatDate}
        
      />
    </div>
  );
};

export default PublicationsList;
