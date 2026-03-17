import { useThemeStore } from "../../../store/ThemeStore";
export const BtnToggleTheme = () => {

    const {theme,setTheme} = useThemeStore ();

    return (
        <button className="flex items-start gap-3 p-2 rounded-lg 
        hover:bg-gray-300 dark:hover:bg-primary/20 transitions-all
        justify-start cursor-pointer" onClick={setTheme}>
            <span>{theme === "light" ? "🌞" : "🌚" }</span>
            <span className="hidden sm:block">{theme === "light" ? "light" : "dark"}</span>
        </button>

    )
}