import { Link } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
const Navbar = () => {
  const [signOut] = useSignOut(auth);
  const [user] = useAuthState(auth);
  const handleLogOut = async () => {
    await signOut();
  };
  return (
    <div className="home-header">
      <header data-thq="thq-navbar" className="home-navbar-interactive">
        <Link to={"/"}>
          <img src="/logo_lekarz.png" alt="logo strony" id="logo" />
        </Link>
        <div data-thq="thq-navbar-nav" className="home-desktop-menu">
          <nav className="home-links">
            <Link to={"/"}>Strona główna</Link>
            {user && (
              <span className="home-nav3">
                <Link to={"find-doctor"}>Znajdź Lekarza</Link>
              </span>
            )}

            <span className="home-nav4">
              <Link to="contact">Kontakt</Link>
            </span>
          </nav>
          {!user && (
            <div className="home-buttons">
              <Link to={"/login"} className="home-login button">
                Zaloguj
              </Link>
              <Link to={"/register"} className="home-register button">
                Zarejestruj
              </Link>
            </div>
          )}
          {user && (
            <div className="home-buttons">
              <button className="home-login button" onClick={handleLogOut}>
                Wyloguj
              </button>
              {user.displayName && (
                <Link to={"/profile"}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.displayName}`}
                    alt="avatar"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Link>
              )}
              {!user.displayName && (
                <Link to={"/profile"}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.email}`}
                    alt="avatar"
                    style={{
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                    }}
                  />
                </Link>
              )}
            </div>
          )}
        </div>
        <div data-thq="thq-burger-menu" className="home-burger-menu">
          <svg viewBox="0 0 1024 1024" className="home-icon">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className="home-mobile-menu">
          <div className="home-nav">
            <div className="home-top">
              <Link to={"/"}>
                <img src="/logo_lekarz.png" alt="logo strony" id="logo" />
              </Link>
              <div data-thq="thq-close-menu" className="home-close-menu">
                <svg viewBox="0 0 1024 1024" className="home-icon02">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav className="home-links1" style={{ zIndex: "9999" }}>
              <Link to={"/"}>
                <span className="home-nav11">Strona Główna</span>
              </Link>
              <Link to={"find-doctor"}>
                <span className="home-nav2">Znajdź Lekarza</span>
              </Link>
              <Link to={"contact"}>
                <span className="home-nav41">Kontakt</span>
              </Link>
            </nav>
            <div className="home-buttons1">
              <button className="home-login1 button">Login</button>
              <button className="home-register1 button">Register</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
