import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/changeTheme/changeThemeSlice.js";
import TextButton from "../ui/TextButton/TextButton";
import OnMoon from "../ui/icons/OnMoon.jsx";
import OnSun from "../ui/icons/OnSun.jsx";

const ThemeSwitcher = () => {
  const theme = useSelector((state) => state.theme.theme || "light");
  const dispatch = useDispatch();

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.className = theme;
  }, [theme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <TextButton
      onClick={handleToggle}
      children={theme === "light" ? <OnMoon /> : <OnSun />}
    />
  );
};

export default ThemeSwitcher;
