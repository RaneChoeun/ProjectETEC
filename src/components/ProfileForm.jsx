import React, { useState, useEffect } from "react";
import { X, Edit, Save, Camera } from "lucide-react";

const ProfileForm = ({ userData, onClose, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    phone: "",
    profilePicture:
      "https://i.pinimg.com/736x/85/77/80/8577804deccd8993f0b397632441b656.jpg",
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        fullName: userData.fullName || "Men Chhorvy",
        gender: userData.gender || "",
        birthDate: userData.birthDate || "",
        phone: userData.phone || "",
        profilePicture:
          userData.profilePicture ||
          "https://i.pinimg.com/736x/85/77/80/8577804deccd8993f0b397632441b656.jpg",
      });
    }
  }, [userData]);//run when useData change
  //Dependency array

  const handleEditProfile = () => setIsEditing(true);

  const handleSaveProfile = () => {
    // Call the update function passed from parent
    if (onUpdateProfile) {
      onUpdateProfile(profileData);
    }
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset to original data
    if (userData) {
      setProfileData({
        fullName: userData.fullName || "Men Chhorvy",
        gender: userData.gender || "",
        birthDate: userData.birthDate || "",
        phone: userData.phone || "",
        profilePicture:
          userData.profilePicture ||
          "https://i.pinimg.com/736x/85/77/80/8577804deccd8993f0b397632441b656.jpg",
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Mock function for profile picture change
  // ********************
  // const handleProfilePictureChange = () => {
  //   if (isEditing) {
  //     // In a real app, you would open a file picker here
  //     const newProfilePicture =
  //       "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80";
  //     setProfileData((prev) => ({
  //       ...prev,
  //       profilePicture: newProfilePicture,
  //     }));
  //     alert("Profile picture updated!");
  //   }
  // };
//*********** */
  const handleProfilePictureChange = () => {
    if (!isEditing) return;

  // Create a file input dynamically
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // Only images

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
      // Create a preview URL
        const imageUrl = URL.createObjectURL(file);

      // Update state to show the selected image
        setProfileData((prev) => ({
          ...prev,
        profilePicture: imageUrl,
        profileFile: file, // optional, store file for upload
      }));
    }
  };

  fileInput.click(); // Open file picker
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-700 hover:text-purple-900 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-700">Your Profile</h2>
          {!isEditing && (
            <button
              onClick={handleEditProfile}
              className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              <Edit className="w-4 h-4 mr-1" /> Edit
            </button>
          )}
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-4 border-white bg-white mb-3">
              <img
                src={profileData.profilePicture}
                alt="Profile"
                className="object-cover w-full h-full"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            {isEditing && (
              <button
                onClick={handleProfilePictureChange}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                Change Photo
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              readOnly={!isEditing}
              className={`w-full p-3 border rounded-lg transition-all ${
                isEditing
                  ? "border-purple-300 bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  : "border-purple-300 bg-gray-50 text-gray-600"
              }`}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Gender
            </label>
            {isEditing ? (
              <select
                value={profileData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-full p-3 border border-purple-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <input
                type="text"
                value={profileData.gender || "Not specified"}
                readOnly
                className="w-full p-3 border border-purple-300 rounded-lg bg-gray-50 text-gray-600"
              />
            )}
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Birth Date
            </label>
            <input
              type={isEditing ? "date" : "text"}
              value={
                isEditing
                  ? profileData.birthDate
                  : profileData.birthDate || "Not specified"
              }
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              readOnly={!isEditing}
              className={`w-full p-3 border rounded-lg transition-all ${
                isEditing
                  ? "border-purple-300 bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  : "border-purple-300 bg-gray-50 text-gray-600"
              }`}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              readOnly={!isEditing}
              className={`w-full p-3 border rounded-lg transition-all ${
                isEditing
                  ? "border-purple-300 bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  : "border-purple-300 bg-gray-50 text-gray-600"
              }`}
            />
          </div>

          {/* Email (Read-only) */}
          {userData?.email && (
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                readOnly
                className="w-full p-3 border border-purple-300 rounded-lg bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div
            className={`flex gap-3 pt-4 ${
              isEditing ? "justify-between" : "justify-center"
            }`}
          >
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-all font-medium hover:scale-105 active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all font-medium flex items-center justify-center hover:scale-105 active:scale-95"
                >
                  <Save className="w-4 h-4 mr-2" /> Save
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition-all font-medium hover:scale-105 active:scale-95"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
