import { useState } from "react";
import logo from "../assets/logo.svg";
import avatar from "../assets/avatar.svg";

export default function Header({ user, onSignUp }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header_inner">
        <img src={logo} alt="24/7 forecast" height="40" />

        <button className="header_burger" onClick={() => setOpen(!open)}>
          Menu {open ? "▶" : "▼"}
        </button>

        <div className={open ? "header_menu header_menu_open" : "header_menu"}>
          <nav className="header_links">
            <a href="#about">Who we are</a>
            <a href="#contacts">Contacts</a>
            <a href="#news">Menu</a>
          </nav>

          <div className="header_user">
            {user ? (
              <b>{user.username}</b>
            ) : (
              <button className="btn" onClick={onSignUp}>
                Sign Up
              </button>
            )}
            <img className="header_avatar" src={avatar} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}
