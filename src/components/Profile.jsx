import {
  useState,
  useEffect,
} from "react";

import "../styles/profile.css";

import { updateProfile } from "firebase/auth";

import { auth } from "../firebase";

function Profile({ closeProfile }) {
  const [fullName, setFullName] =
    useState("");

  const [photoUrl, setPhotoUrl] =
    useState("");

  useEffect(() => {
    const fetchUserData =
      async () => {
        try {
          const token =
            await auth.currentUser.getIdToken();

          const response =
            await fetch(
              `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
                import.meta.env
                  .VITE_FIREBASE_API_KEY
              }`,
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  idToken: token,
                }),
              }
            );

          const data =
            await response.json();

          const user =
            data.users[0];

          setFullName(
            user.displayName || ""
          );

          setPhotoUrl(
            user.photoUrl || ""
          );
        } catch (error) {
          console.log(error);
        }
      };

    if (auth.currentUser) {
      fetchUserData();
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(
        auth.currentUser,
        {
          displayName: fullName,

          photoURL: photoUrl,
        }
      );

      alert("Profile Updated");

      closeProfile();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-top">
         
        <button
          type="button"
          onClick={closeProfile}
        >
          Cancel
        </button>
      </div>

      <div className="profile-box">
        <h2>Contact Details</h2>

        <form
          onSubmit={handleUpdate}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Profile Photo URL"
            value={photoUrl}
            onChange={(e) =>
              setPhotoUrl(
                e.target.value
              )
            }
          />

          <button type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;