import React, { useEffect } from "react";

import "./layout.css";

import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Routes from "../Routes";

import { BrowserRouter, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ThemeAction from "../../redux/actions/ThemeAction";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const modeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    const themeClass = localStorage.getItem("themeColor", "theme-mode-light");

    dispatch(ThemeAction.setMode(modeClass));

    dispatch(ThemeAction.setColor(colorClass));
    dispatch(ThemeAction.setTheme(themeClass));
  }, [dispatch]);
  const isAuthenticated = localStorage.getItem("isauthenticated");
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout ${themeReducer.mode} ${themeReducer.color} `}>
            {console.log(
              "Mode",
              themeReducer.mode,
              "Color",
              themeReducer.color,
              "Theme",
              themeReducer
            )}
            {isAuthenticated ? (
              <>
                <Sidebar {...props} />
                <div className={`layout__content ${themeReducer.theme}`}>
                  <TopNav />
                  <div className="layout__content-main">
                    <Routes />
                  </div>
                </div>
              </>
            ) : (
              <div className="layout__content-main">
                <Routes />
              </div>
            )}
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
