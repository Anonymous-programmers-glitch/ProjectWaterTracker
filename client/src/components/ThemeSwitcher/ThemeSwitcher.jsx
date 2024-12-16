import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice/themeSlice";
import Button from "../ui/Button/Button";

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
    <Button
      onClick={handleToggle}
      children={theme === "light" ? "Dark Theme" : "Light Theme"}
    />
  );
};

export default ThemeSwitcher;
