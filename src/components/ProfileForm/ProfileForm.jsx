import { useState } from 'react';

const ProfileForm = ({ profile, onUpdate, onCancel }) => {
  const initialProfile = {
    name: profile.name || '',
    location: profile.location || '',
    currentStyle: profile.currentStyle || '',
    influences: profile.influences || '',
  };

  const [updatedProfile, setUpdatedProfile] = useState(initialProfile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(updatedProfile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={updatedProfile.name} onChange={handleChange} />
      <input type="text" name="location" value={updatedProfile.location} onChange={handleChange} />
      <input type="text" name="currentStyle" value={updatedProfile.currentStyle} onChange={handleChange} />
      <input type="text" name="influences" value={updatedProfile.influences} onChange={handleChange} />
      <button type="submit" className="button-spacing">Update Profile</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ProfileForm;
