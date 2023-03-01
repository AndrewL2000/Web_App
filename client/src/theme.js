// Color design tokens export
export const tokensDark = {
    grey: {
        0: "#ffffff", // manually adjusted
        10: "#f6f6f6", // manually adjusted
        50: "#f0f0f0", // manually adjusted
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
        1000: "#000000", // manually adjusted
    },
    primary: {
        // blue
        100: "#d8d8d9",
        200: "#b2b2b3",
        300: "#8b8b8e",
        400: "#656568",
        500: "#3e3e42",
        600: "#323235",
        700: "#252528",
        800: "#19191a",
        900: "#0c0c0d",
    },
    secondary: {
        // yellow
        100: "#f9fefe",
        200: "#f3fdfe",
        300: "#ecfdfd",
        400: "#e6fcfd",
        500: "#e0fbfc",
        600: "#b3c9ca",
        700: "#869797",
        800: "#5a6465",
        900: "#2d3232",
    },

    graphs: {
        100: "#ff7676", // Red
        200: "#ffbb76", // Orange
        300: "#72DCFF", // Light Blue
        400: "#ffff76", // Yellow
        500: "#BEFE9D", // Light Green
        600: "#76ffbb", // Turquoise
        700: "#769bff", // Blue
        800: "#9576ff", // Purple
        900: "#ff76e0", // Pink
        1000: "#6FFF6F", // Green 
    },

    blue: {
        100: "#F0F8FF", // manually adjusted
        200: "#89CFF0", // manually adjusted
        300: "#007FFF", // manually adjusted
        400: "#0039a6",
        500: "#0a2351",
        600: "#0039e6",
        700: "#002e4d",
        800: "#002699",
        900: "#00134d",
        1000: "#c299ff",
        1100: "#944dff",
        1200: "#6600ff",
        1300: "#3d0099", // manually adjusted
    },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
    const reversedTokens = {};
    Object.entries(tokensDark).forEach(([key, val]) => {
        const keys = Object.keys(val);
        const values = Object.values(val);
        const length = keys.length;
        const reversedObj = {};
        for (let i = 0; i < length; i++) {
            reversedObj[keys[i]] = values[length - i - 1];
        }
        reversedTokens[key] = reversedObj;
    });
    return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                      // palette values for dark mode
                      primary: {
                          ...tokensDark.primary,
                          main: tokensDark.primary[400],
                          light: tokensDark.primary[400],
                      },
                      secondary: {
                          ...tokensDark.secondary,
                          main: tokensDark.secondary[300],
                      },
                      neutral: {
                          ...tokensDark.grey,
                          main: tokensDark.grey[500],
                      },
                      background: {
                          default: tokensDark.primary[500],
                          alt: tokensDark.primary[700],
                      },
                      graphs: {
                          ...tokensDark.graphs,
                      },
                      blue: {
                          ...tokensDark.blue,
                      },
                  }
                : {
                      // palette values for light mode
                      primary: {
                          ...tokensLight.primary,
                          main: tokensDark.grey[50],
                          light: tokensDark.grey[100],
                      },
                      secondary: {
                          ...tokensLight.secondary,
                          main: tokensDark.secondary[600],
                          light: tokensDark.secondary[700],
                      },
                      neutral: {
                          ...tokensLight.grey,
                          main: tokensDark.grey[500],
                      },
                      background: {
                          default: tokensDark.grey[0],
                          alt: tokensDark.grey[50],
                      },
                  }),
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};
