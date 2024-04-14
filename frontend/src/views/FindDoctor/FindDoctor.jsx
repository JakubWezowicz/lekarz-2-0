import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./FindDoctor.css";

function distanceBetweenCities(lon1, lat1, lon2, lat2) {
  // Konwersja stopni na radiany
  lon1 = (lon1 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Różnice długości i szerokości geograficznych
  var dlon = lon2 - lon1;
  var dlat = lat2 - lat1;

  // Obliczenie odległości przy użyciu formuły Haversine
  var a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var r = 6371; // Średnia ziemska promień w kilometrach
  var distance = r * c;

  return distance;
}

const FindDoctor = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [specializations, setSpecializations] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(0);
  const [matchedDoctors, setMatchedDoctors] = useState([]);
  const [visitInfo, setVisitInfo] = useState({
    reserved: false,
    doctorId: "",
    visitDate: null,
  });
  useEffect(() => {
    setIsLoading(true);
    const getDoctors = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_IP}/doctors`
      );
      const doctors = await response.json();
      setData(doctors);
      setSelectedSpecialization(doctors[0].specialization);
      setSpecializations([
        ...new Set(doctors.map((doctor) => doctor.specialization)),
      ]);
      setIsLoading(false);
    };
    getDoctors();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&city=${city}`
      );
      const loc1 = await response.json();
      const getDoctors = async () => {
        setMatchedDoctors([]);

        data.map(async (doctor) => {
          if (
            doctor.specialization === selectedSpecialization &&
            doctor.city.toLowerCase() === city.toLowerCase()
          ) {
            setMatchedDoctors((prev) => [...prev, doctor]);
          } else if (
            doctor.specialization === selectedSpecialization &&
            doctor.city.toLowerCase() !== city.toLowerCase() &&
            distance > 0
          ) {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&city=${doctor.city}`
            );
            const loc2 = await response.json();
            if (loc1.length === 0 || loc2.length === 0) {
              setError("Nie znaleziono miasta");
              return;
            }
            setError(null);
            const distance2 = distanceBetweenCities(
              loc1[0].lon,
              loc1[0].lat,
              loc2[0].lon,
              loc2[0].lat
            );
            if (
              distance2 <= parseInt(distance) &&
              doctor.specialization === selectedSpecialization
            ) {
              setMatchedDoctors((prev) => [...prev, doctor]);
            }
          }
        });
      };
      await getDoctors().then(() => setIsLoading(false));
    } catch (err) {
      setError("Błąd podczas pobierania danych");
    }
  };
  const setVisit = async (id, visitDate) => {
    console.log(visitDate);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_SERVER_IP}/visits`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: user.uid,
            doctorId: id,
            visitDate: visitDate,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
      return;
    }
    setVisitInfo({
      ...visitInfo,
      reserved: true,
      doctorId: id,
    });
  };
  useEffect(() => {
    console.log(matchedDoctors);
  }, [matchedDoctors]);
  useEffect(() => {
    console.log(visitInfo);
  }, [visitInfo]);

  return (
    <div className="find-doctor">
      <div className="doctor">
        <h2>Znajdź Lekarza</h2>

        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="city"
            placeholder="Podaj miasto"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={isLoading}
          />
          <p>{distance} km</p>
          <input
            type="range"
            name="distance"
            onChange={(e) => setDistance(e.target.value)}
            value={distance}
          />
          <select
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            value={selectedSpecialization}
          >
            {specializations.map((specialization) => (
              <option key={specialization}>{specialization}</option>
            ))}
          </select>
          <input type="submit" value="Znajdź Lekarza" />
        </form>
      </div>
      <div className="matchedDoctors-list">
        <h3>Dostępni lekarze</h3>
        {matchedDoctors && (
          <ul>
            {matchedDoctors.map((doctor) => (
              <li key={doctor._id} className="doctor-card">
                <h4>
                  {doctor.name} {doctor.surname}
                </h4>
                <p>{doctor.specialization}</p>
                <p>{doctor.city}</p>
                <br />
                <p>Na kiedy?</p>
                <input
                  type="date"
                  onChange={(e) =>
                    setVisitInfo({
                      ...visitInfo,
                      visitDate: new Date(e.target.value).toISOString(),
                    })
                  }
                />
                {visitInfo.visitDate && (
                  <>
                    <p>Na którą godzinę?</p>
                    <input
                      type="time"
                      onChange={(e) => {
                        const selectedTime = e.target.value;
                        const currentDate = new Date(visitInfo.visitDate);
                        const hoursMinutes = selectedTime.split(":");
                        currentDate.setHours(hoursMinutes[0]);
                        currentDate.setMinutes(hoursMinutes[1]);

                        setVisitInfo({
                          ...visitInfo,
                          visitDate: currentDate.toISOString(),
                        });
                      }}
                    />
                  </>
                )}

                <button
                  onClick={(e) => {
                    e.target.disabled = true;
                    setVisit(doctor._id, visitInfo.visitDate);
                  }}
                >
                  Umów się z lekarzem
                </button>
                {visitInfo.doctorId == doctor._id && (
                  <p style={{ color: "green" }}>Umówiono wizytę</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FindDoctor;
