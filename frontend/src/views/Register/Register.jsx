import "./Register.css";
import { useState, useEffect } from "react";
// importing firebase auth
import { auth } from "../../firebase/config";
import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, newUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    if (newUser || user) {
      navigate("/");
    }
  }, [newUser, user]);
  return (
    <div className="register">
      <form>
        <h2>Zarejestruj się</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Podaj email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Podaj hasło"
        />
        <input type="submit" value="Stwórz konto" onClick={handleSubmit} />
      </form>
      {loading && <p>Ładowanie...</p>}
      {error && <p>Wystąpił błąd: {error.message}</p>}
    </div>
  );
};

export default Register;
