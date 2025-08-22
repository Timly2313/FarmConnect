// theme.js
const lightTheme = {
    fontSize: 14,
    colors: {
      background: "#f8fffe",
      foreground: "oklch(0.145 0 0)", // may need to convert to hex
      card: "#ffffff",
      primary: "#16a34a",
      primaryForeground: "#ffffff",
      secondary: "#dcfce7",
      secondaryForeground: "#15803d",
      muted: "#f0fdf4",
      mutedForeground: "#6b7280",
      accent: "#bbf7d0",
      accentForeground: "#15803d",
      destructive: "#dc2626",
      destructiveForeground: "#ffffff",
      border: "rgba(34, 197, 94, 0.2)",
      inputBackground: "#f9fafb",
      switchBackground: "#d1d5db",
      ring: "#22c55e",
  
      // agriculture custom colors
      agriculture: {
        primary: "#16a34a",
        secondary: "#22c55e",
        light: "#dcfce7",
        lighter: "#f0fdf4",
        dark: "#15803d",
        darker: "#14532d",
      },
  
      earth: {
        brown: "#92400e",
        light: "#fef3c7",
      },
      sky: "#0ea5e9",
      sun: "#eab308",
      water: "#06b6d4",
    },
    radius: {
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
    },
  };
  
  const darkTheme = {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      background: "#0f172a",
      foreground: "oklch(0.985 0 0)", // convert if needed
      card: "#1e293b",
      primary: "#22c55e",
      primaryForeground: "#0f172a",
      secondary: "#164e63",
      secondaryForeground: "#22c55e",
      muted: "#334155",
      mutedForeground: "#94a3b8",
      accent: "#164e63",
      accentForeground: "#22c55e",
      destructive: "#ef4444",
      border: "rgba(34, 197, 94, 0.3)",
      inputBackground: "#334155",
    },
  };
  
  export { lightTheme, darkTheme };
  