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
  const [isLoading, setIsLoading] = useState(false);
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
  const handleDelete = async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_SERVER_DEV_IP}/visits/${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      console.log("Deleted");
      setData(data.filter((visit) => visit._id !== id));
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    const fetchVisits = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_DEV_IP}/visits/${user.uid}`,
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
      setIsLoading(false);
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
        `${process.env.REACT_APP_BACKEND_SERVER_DEV_IP}/doctors/${id}`,
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
        <div className="profile-data">
          <h1>Twój profil użytkownika</h1>
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
          <h3>Twój mail: {user?.email}</h3>
        </div>

        <div className="edit-profile">
          <h2>Edytuj profil:</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Podaj imię i nazwisko"
            />
            <label htmlFor="input">
              Wypełnij aby zmienić nazwe uzytkownika
            </label>
            <input type="submit" value="Zmien" />
          </form>
        </div>
      </div>
      <div className="visits">
        <h2>Twoje wizyty:</h2>
        {isLoading && <p>Loading...</p>}

        <div className="visits-list">
          {data &&
            data.map((visit) => (
              <div className="visit" key={visit._id}>
                {doctors.map((doctor) => {
                  if (doctor._id === visit.doctorId) {
                    return (
                      <>
                        <p>
                          Doktor: <b>{`${doctor.name} ${doctor.surname}`}</b>
                        </p>
                        <p>{`Specializacja: ${doctor.specialization}`}</p>
                      </>
                    );
                  }
                })}
                <p>
                  Data wizyty: {new Date(visit.visitDate).toLocaleDateString()}
                </p>
                <p>
                  Godzina wizyty:{" "}
                  {new Date(visit.visitDate)
                    .toLocaleTimeString()
                    .substring(0, 5)}
                </p>
                <button onClick={() => handleDelete(visit._id)}>
                  Anuluj wizytę
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
