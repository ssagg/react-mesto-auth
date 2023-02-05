import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDataContext } from "../contexts/UserDataContext";
import { LoginDataContext } from "../contexts/LoginDataContext";
import { useContext } from "react";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

function NavBar({ handleLogout, userEmail }) {
  const navigate = useNavigate();
  //   const userEmail = useContext(UserDataContext);
  const loggedIn = useContext(LoginDataContext);
  console.log(userEmail);
  console.log(loggedIn);

  function signOut() {
    localStorage.removeItem("token");
    handleLogout();
    navigate("/sign-in", { replace: true });
  }
  return (
    <nav className="header__menu">
      {loggedIn ? (
        <>
          <p className="header__email">{userEmail.data.email}</p>
          <button onClick={signOut} className="header__button">
            Выход
          </button>
        </>
      ) : (
        <div className="">do not show</div>
      )}
      {/* <p className="header__email">{userEmail.data.email}</p>
      <button onClick={signOut} className="header__button">
        Выход
      </button> */}
    </nav>
  );
}

export default NavBar;
