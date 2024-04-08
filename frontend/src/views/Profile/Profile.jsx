import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
const Profile = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [displayName, setDisplayName] = useState("");
  const [data, setData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let firstName = displayName.substring(0, displayName.indexOf(" "));
    let secondName = displayName.substring(
      displayName.indexOf(" "),
      displayName.length
    );
    await updateProfile({ displayName: `${firstName} ${secondName}` });
    setDisplayName("");
  };
  useEffect(() => {
    const fetchVisits = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_IP}/visits/${user.uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application",
          },
        }
      );
      const data = await response.json();
      setData(data);
      console.log(data);
    };
    if (!user) {
      navigate("/");
    } else {
      fetchVisits();
    }
  }, [user]);
  useEffect(() => {
    // get doctors info from id
    const getDoctor = async (id) => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_IP}/doctors/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application",
          },
        }
      );
      const data = await response.json();
      return data;
    };
    const fetchDoctorsInfo = async () => {
      const doctorsInfo = await Promise.all(
        data.map(async (visit) => {
          const doctor = await getDoctor(visit.doctorId);
          return doctor;
        })
      );
      setDoctors(doctorsInfo);
    };
    fetchDoctorsInfo();
  }, [data]);
  useEffect(() => {
    console.log(doctors);
  }, [doctors]);
  return (
    <div className="profile">
      <div className="profile-info">
        <h1>Profile</h1>
        {user?.displayName && (
          <>
            <img
              src={`https://ui-avatars.com/api/?name=${user.displayName}`}
              alt="avatar"
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            />
            <h2>Witaj, {user?.displayName}</h2>
          </>
        )}
        <h2>{user?.email}</h2>
        <div className="edit-profile">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Podaj imię i nazwisko"
            />
            <input type="submit" value="Zmien" />
          </form>
        </div>
      </div>
      <div className="visits">
        <h2>Twoje wizyty</h2>
        {data &&
          data.map((visit) => (
            <div className="visit" key={visit._id}>
              <p>{visit._id}</p>
              <p>{doctors.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;