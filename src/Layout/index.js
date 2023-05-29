import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userName = JSON.parse(localStorage.getItem("name"));

  return (
    <div>
      <div className="header">
      <div className="ic">
        <h1>
          <Link className="color1 " to='/'>HOLIDAZE
          </Link>
        </h1>
        {accessToken ? (
          <div className="div3">
            <Link className="li" to='/'>
              HOME
            </Link>
            <Link className="li" to={`/Profile/${userName}`}>
              PROFILE
            </Link>
            <Link className="li"
                to='/'
                onClick={() => {
                  localStorage.clear();
                }}
              >
                LOGOUT
              </Link>
          </div>
        ) : (
          <div className="div3">
            <Link className="li" to='/'>HOME</Link>
            <Link className="li" to='/Login'>LOGIN</Link>
            <Link className="li" to='/Register'>REGISTER</Link>
          </div>
        )}
      </div>
    </div>
      <main>{children}</main>
      <footer className="footer">
      <h2 className="copy">Holidaze&copy;</h2>
    </footer>
    </div>
  );
};

export default Layout;
