import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ loggedIn, userData }) {
  console.log(userData);
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }
  return (
    <nav className="header__menu">
      <p className="header__email">{userData.data.email}</p>
      <button onClick={signOut} className="header__button">
        Выход
      </button>
    </nav>
  );
}

export default NavBar;
