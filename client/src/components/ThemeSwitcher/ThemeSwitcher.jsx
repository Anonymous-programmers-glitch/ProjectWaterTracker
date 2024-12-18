import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice/themeSlice";
import TextButton from "../ui/TextButton/TextButton";
import ToggleOff from "../ui/icons/toggleOff";
import ToggleON from "../ui/icons/toggleOn";

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
      children={theme === "light" ? <ToggleOff /> : <ToggleON />}
    />
  );
};

export default ThemeSwitcher;
