import { useState } from 'react';
import axios from 'axios';

/**
 * Custom hook to delete a user.
 * @param {string} userId - The ID of the user to delete.
 * @param {string} password - The password of the user for authentication.
 * @returns {Object} - An object containing the loading state, error message, and a function to delete the user.
 */
const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteUser = async (userId, password) => {
    setLoading(()=>true);
    setError(()=>null);

    try {
      const response = await axios.delete('/api/user/delete', {
        data: { userId, password }, // Pass data in the request body
        withCredentials: true, // Include credentials if needed
      });

      // Handle successful response
    //   console.log('User deleted successfully:', response.data);
      window.location.reload()
    } catch (err) {
      // Handle error
      if (err.response && err.response.data) {
        setError(err.response.data.message);
        alert(err.response.data.message)
      } else {
        setError(err.message || 'Something went wrong');
        alert(err.message || 'Something went wrong')
      }
    } finally {
      setLoading(()=>false);
    }
  };

  return { loading, error, deleteUser };
};

export default useDeleteUser;
