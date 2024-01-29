import { useState, useEffect } from 'react';
import * as tokenService from '../../services/tokenService.js';
import * as profileService from '../../services/profileService.js';
import ProfileForm from '../../components/ProfileForm/ProfileForm.jsx';

import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const profileId = tokenService.getProfileFromToken();
      if (profileId) {
        try {
          const profileData = await profileService.getProfile(profileId);
          setProfile(profileData);
        } catch (error) {
          console.error('Error fetching profile', error);
        }
      } else {
        console.log('No profile id in token');
      }
    };

    getProfile();
  }, []);

  const handleUpdate = async (updatedProfile) => {
    try {
      const profileId = tokenService.getProfileFromToken();
      if (profileId) {
        await profileService.updateProfile(profileId, updatedProfile);
        setProfile(updatedProfile);
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className='profile-container'>
      {profile ? (
        <div className='profile'>
          <h1>{profile.name}</h1>
          <h2>Location: {profile.location}</h2>
          <h2>Current Style: {profile.currentStyle}</h2>
          <h2>Influences: {profile.influences}</h2>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          {editing && <ProfileForm profile={profile} onUpdate={handleUpdate} onCancel={handleCancel} />}
        </div>
      ) : (
        <h1 className='loading-text'>Loading Profile...</h1>
      )}
    </div>
  );
};

export default Profile;
