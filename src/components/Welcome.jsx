import "../styles/welcome.css";

import { auth } from "../firebase";

function Welcome({
  openProfile,
}) {
  const isProfileComplete =
    auth.currentUser?.displayName &&
    auth.currentUser?.photoURL;

  return (
    <div className="welcome-page">
      <div className="welcome-box">
        <h2>
          Welcome to Expense
          Tracker!!!
        </h2>

        {!isProfileComplete ? (
          <div className="profile-alert">
            <span>
              Your profile is
              incomplete.
            </span>

            <button
              type="button"
              onClick={openProfile}
            >
              Complete now
            </button>
          </div>
        ) : (
          <div className="profile-complete">
            <span>
              Profile completed
              successfully 😀
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Welcome;