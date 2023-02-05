import logo from "../images/logo/logo.svg";
import NavBar from "./ NavBar";
import { Link, useLocation } from "react-router-dom";

function Header({ loggedIn, userData, handleLogout, userEmail }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {/* {location.pathname === '/sign-in'|| location.pathname === '/sign-up' ? null : <Navbar />} */}
      {/* <Link to="login" className="register__login-link">Войти</Link> */}
      {
        loggedIn ? (
          <NavBar
            userData={userData}
            handleLogout={handleLogout}
            userEmail={userEmail}
          />
        ) : location.pathname === "/sign-in" ? (
          <Link className="header__link" to="sign-up">
            Регистрация
          </Link>
        ) : (
          <Link className="header__link" to="sign-in">
            Войти
          </Link>
        )
        // <Link to="sign-up">Регистрация</Link>
      }
    </header>
  );
}

export default Header;
