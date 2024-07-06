import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './profile.css'; 

const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();



  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user data:", error);
    return <div>Error: {error.message}</div>;
  }

  if (!isAuthenticated) {
    console.log("User is not authenticated");
    return <div>User is not authenticated</div>;
  }

  if (isAuthenticated && !user) {
    console.log("No user information available");
    return <div>No user information available</div>;
  }

 



  if(user.sub.includes('google-oauth2')) {
    var userName = user.name;
    var userPicture = user.picture;
    var userEmail = user.email;
  }

  return (
    <div className="profile_con">
      <h1>User Profile</h1>
      <h2>{userName}</h2>
      <div className="profile_img">
     <img src={userPicture} alt={userName} />
     <h2>{userEmail}</h2>
      </div>
   
    </div>
  );
};

export default Profile;