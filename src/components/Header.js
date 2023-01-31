import logo from "../images/logo/logo.svg";
import NavBar from "./ NavBar";
import { Link } from "react-router-dom";

function Header({ loggedIn, userData }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      {/* <Link to="login" className="register__login-link">Войти</Link> */}
      {loggedIn ? (
        <NavBar userData={userData} />
      ) : (
        <Link to="sign-up">Регистрация</Link>
      )}
    </header>
  );
}

export default Header;
