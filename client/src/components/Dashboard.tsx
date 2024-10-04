import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const navigate = useNavigate();

  //👇🏻 Runs when a user sign out
  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("_myEmail");
    navigate("/");
  };

  return (
    <div>
      <nav className='flex bg-amber-100'>
        <h2 className='flex-grow'>BookMe</h2>
        <button onClick={handleLogout} className='logout__btn'>
          Log out
        </button>
      </nav>
      <main className='dashboard__main'>
        <h2 className='dashboard__heading'>Select your availability</h2>

        <div className='timezone__wrapper'>
          <p>Pick your timezone</p>
          <TimezoneSelect
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
