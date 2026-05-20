import "../styles/welcome.css";
import { auth } from "../firebase";

function Welcome({ openProfile }) {
  const user = auth.currentUser;
 
  const handleVerifyEmail = async () => {
    try {
 
      const token =
        await user.getIdToken();
 
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${
          import.meta.env.VITE_FIREBASE_API_KEY
        }`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },
 
          body: JSON.stringify({
            requestType:
              "VERIFY_EMAIL",

            idToken: token,
          }),
        }
      );

      const data =
        await response.json();
 
      if (!response.ok) {
        throw new Error(
          data.error.message
        );
      }
 
      alert(
        "Verification email sent successfully"
      );

    } catch (error) {

      alert(error.message);
    }
  };

  return (
    <div className="welcome-page">
      <div className="welcome-box">

        <h2>
          Welcome to Expense
          Tracker!!!
        </h2>
 
        {user?.displayName ? (
          <div className="success-alert">

            <span>
              Profile completed
              successfully 😀
            </span>

           
            {user.emailVerified ? (

              <button disabled>
                Email Verified 
              </button>

            ) : (
              <button
                onClick={
                  handleVerifyEmail
                }
              >
                Verify Email
              </button>
            )}

          </div>
        ) : (

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
        )}

      </div>
    </div>
  );
}

export default Welcome;