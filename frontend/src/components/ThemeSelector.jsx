import { PaletteIcon, CheckIcon, SparklesIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  // Group themes by category
  const groupedThemes = THEMES.reduce((acc, themeItem) => {
    const category = themeItem.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(themeItem);
    return acc;
  }, {});

  return (
    <div className="dropdown dropdown-end">
      {/* DROPDOWN TRIGGER */}
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle hover:bg-primary-50 hover:text-primary-600 transition-all duration-200 relative group"
        title="Change Theme"
      >
        <PaletteIcon className="size-5" />
        <SparklesIcon className="size-3 absolute -top-1 -right-1 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-3 p-4 shadow-hard bg-base-100/95 backdrop-blur-xl rounded-3xl
        w-80 border border-base-300/50 max-h-96 overflow-y-auto animate-slide-down"
      >
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gradient-primary mb-1">Choose Theme</h3>
          <p className="text-sm text-neutral-500">Select your preferred color scheme</p>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedThemes).map(([category, themes]) => (
            <div key={category} className="space-y-2">
              <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2">
                {category}
              </h4>
              <div className="space-y-1">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.name}
                    className={`
                      w-full px-4 py-3 rounded-2xl flex items-center gap-3 transition-all duration-200
                      hover:scale-[1.02] hover:shadow-soft group
                      ${
                        theme === themeOption.name
                          ? "bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 text-primary-700 shadow-glow-primary"
                          : "hover:bg-base-200/50 border-2 border-transparent"
                      }
                    `}
                    onClick={() => setTheme(themeOption.name)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {theme === themeOption.name ? (
                        <CheckIcon className="size-4 text-primary-600" />
                      ) : (
                        <PaletteIcon className="size-4 text-neutral-400 group-hover:text-primary-500" />
                      )}
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold">{themeOption.label}</div>
                        {themeOption.description && (
                          <div className="text-xs text-neutral-500 mt-0.5">{themeOption.description}</div>
                        )}
                      </div>
                    </div>

                    {/* THEME PREVIEW COLORS */}
                    <div className="flex gap-1.5">
                      {themeOption.colors.map((color, i) => (
                        <div
                          key={i}
                          className="size-4 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-base-300/50">
          <p className="text-xs text-neutral-400 text-center">
            Theme changes apply instantly
          </p>
        </div>
      </div>
    </div>
  );
};
export default ThemeSelector;
