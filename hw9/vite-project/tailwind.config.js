/** @type {import('tailwindcss').Config} */

// const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      pink: "#F85E9F",
      gray: "#19182580",
      purple: "#5D50C6",
      grayLight: "#EEEEEE",
      white: "#fff",
      dark: "#191825",
      grayDark: "rgba(25, 24, 37, 0.5)",
      grayDarker: "rgba(25, 24, 37, 0.75)",
      orange: "#FF5722",
      yellow: "#FACD49",
    },
    // fontFamily: {
    //   sans: ["CircularStd"],
    // },
    // fontSize: {
    //   small: "16px",
    // },

    extend: {
      fontFamily: {
        CircularStd: ["CircularStd"],
        Inter: ["Inter"],
        Circular: ["Circular"],
      },
      fontSize: {
        small: "16px",
      },
    },
  },
  plugins: [],
};
