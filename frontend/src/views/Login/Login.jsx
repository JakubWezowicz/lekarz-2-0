import "./Login.css";
import { useEffect, useState } from "react";
// importing firebase auth
import { auth } from "../../firebase/config";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, loggedUser, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(email, password);
  };
  useEffect(() => {
    if (loggedUser || user) {
      navigate("/");
    }
  }, [loggedUser, user]);
  return (
    <div className="login">
      <form>
        <h2>Zaloguj się</h2>
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
        <input type="submit" value="Zaloguj się" onClick={handleSubmit} />
      </form>
      {loading && <p>Ładowanie...</p>}
      {error && <p>Wystąpił błąd: {error.message}</p>}
    </div>
  );
};

export default Login;
