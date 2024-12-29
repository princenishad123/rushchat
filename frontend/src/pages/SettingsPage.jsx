import React from "react";
import { useThemeStore } from "../store/useThemeStore";

import { THEMES } from "../constants";
const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div>
      {THEMES.map((e) => (
        <button
          onClick={() => setTheme(e)}
          className="my-2 px-3 border rounded-md m-4"
        >
          {e}
        </button>
      ))}
    </div>
  );
};

export default SettingsPage;
