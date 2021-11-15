import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../models/user";

const Nav = () => {
  const [user, setUser] = useState(new User());

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("auth/user");
      setUser(new User(data.id, data.name, data.surname, data.email, data.phoneNumber, data.thirdName));
    })();
  }, []);

  const logout = async () => {
    await axios.post("auth/logout");
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">
        Company name
      </a>
      <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Link to={"/login"} className="nav-link px-3" onClick={logout}>
            Sign out
          </Link>
          <Link to={"/profile"} className="nav-link px-3" href="#">
            {user.fullName}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
