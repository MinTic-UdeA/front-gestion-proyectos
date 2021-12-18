import React from 'react';
import ReactLoading from 'react-loading';

const ButtonLoading = ({ disabled, loading, text }) => {
  return (
    <button
      disabled={disabled}
      type='submit'
      className='w-60 m-auto bg-blue-600 text-white text-lg p-2 rounded-xl hover:bg-blue-700 shadow-md my-3 disabled:opacity-50 disabled:bg-gray-700'
    >
      {loading ? <ReactLoading type='spin' height={30} width={30} /> : text}
    </button>
  );
};

export default ButtonLoading;