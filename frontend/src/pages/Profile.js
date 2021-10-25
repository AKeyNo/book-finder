import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

export const Profile = () => {
  const { user_id } = useParams();

  useEffect(() => {
    // axios.get();
  }, []);

  return <div>{user_id}</div>;
};
