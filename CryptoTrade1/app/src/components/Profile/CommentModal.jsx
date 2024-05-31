import React from 'react';
import ReactModal from 'react-modal';

const CommentModal = ({ isOpen, onRequestClose, publication }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Comment Modal"
            className="max-w-screen-lg flex items-center bg-gray-800 bg-opacity-80 w-full p-8 mx-auto my-20 rounded-xl"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        >
            {publication && (
                <div className="flex flex-col w-full">
                    <h2 className="text-white text-2xl font-semibold mb-4">Add a comment</h2>
                    <div className="flex flex-col mb-4">
                        <p className="text-white text-lg">{publication.content}</p>
                        <p className="text-gray-400 text-sm mt-1">- {publication.author}, {publication.date}</p>
                    </div>
                    <textarea
                        className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your comment here..."
                    />
                    <button
                        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    >
                        Submit Comment
                    </button>
                </div>
            )}
        </ReactModal>
    );
};

export default CommentModal;
