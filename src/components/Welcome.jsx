function Welcome({
  openProfile,
}) {
  return (
    <div className="welcome-page">
      <div className="welcome-box">
        <h2>
          Welcome to Expense
          Tracker!!!
        </h2>

        <div className="profile-alert">
          <span>
            Your profile is incomplete.
          </span>

          <button
            type="button"
            onClick={openProfile}
          >
            Complete now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;