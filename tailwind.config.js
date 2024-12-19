import plugin from "tailwindcss/plugin";
import tailwindAnimate from "tailwindcss-animated";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textGradient: {
        primary: "linear-gradient(97.27deg, #17E460 36.96%, #3EA060 56.31%)",
        secondary: "linear-gradient(274.92deg, #D6AE50 0%, #FFEE06 100%)",
      },
      colors: {
        dark: "#131720",
        dark1: "#181C24",
        primary: "#53FD8F",
        divide: "rgb(51 65 85)",
      },
    },
  },
  plugins: [
    tailwindAnimate,
    function ({ addUtilities, theme, variants }) {
      const newUtilities = {
        ".text-gradient-primary": {
          color: "#17E460",
          background: theme("textGradient.primary"),
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-secondary": {
          color: "#54FF91",
          background: theme("textGradient.secondary"),
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "text-shadow": "0px 0px 64.84px 0px #FFD37466",
        },
      };
      addUtilities(newUtilities, variants("textGradient"));
    },
    plugin(function ({ addComponents, theme }) {
      const buttonStyles = {
        ".success-btn": {
          background: "linear-gradient(180deg, #7CFF62 0%, #0F9948 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "1.5rem",
          backdropFilter: "blur(20px)",
          padding: "8px 16px",
          border: "none",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "2px",
            left: "2px",
            right: "2px",
            bottom: "2px",
            borderRadius: "1.5rem",
            background: "linear-gradient(98.19deg, #17E460 0%, #3EA060 100%)",
            zIndex: "-1",
          },
          "&:hover": {
            boxShadow: "0px 2px 30px 0px rgba(42, 114, 50, 0.5)",
            cursor: "pointer",
          },
          "&:disabled, &.disabled": {
            background: "#353A4E", // Màu nền khác cho disabled
            cursor: "not-allowed", // Thay đổi con trỏ khi bị vô hiệu hóa
            boxShadow: "none",
            color: "#606576", // Màu chữ của button
            "&::before": {
              background: "#141720", // Background cho trước khi disabled
            },
            // Force đổi màu tất cả phần tử con bên trong
            "& *": {
              color: "#606576 !important", // Màu văn bản cho tất cả phần tử con bên trong
            },
          },
        },
        ".warning-btn": {
          background: "linear-gradient(180deg, #FFF691 0%, #D1AC32 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "1.5rem",
          backdropFilter: "blur(20px)",
          padding: "8px 16px",
          border: "none",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "2px",
            left: "2px",
            right: "2px",
            bottom: "2px",
            borderRadius: "1.5rem",
            background: "linear-gradient(274.92deg, #F3BB34 0%, #FFDB89 100%)",
            zIndex: "-1",
          },
          "&:hover": {
            boxShadow: "0px 2px 30px 0px rgba(255, 239, 116, 0.25)",
            cursor: "pointer",
          },
          "&:disabled, &.disabled": {
            background: "#353A4E", // Màu nền khác cho disabled
            cursor: "not-allowed", // Thay đổi con trỏ khi bị vô hiệu hóa
            boxShadow: "none",
            color: "#606576", // Màu chữ của button
            "&::before": {
              background: "#141720", // Background cho trước khi disabled
            },
            // Force đổi màu tất cả phần tử con bên trong
            "& *": {
              color: "#606576 !important", // Màu văn bản cho tất cả phần tử con bên trong
            },
          },
        },

        ".danger-btn": {
          background: "linear-gradient(to right,#FF3131, #FF3131)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "transparent",
          borderRadius: "1.5rem",
          backdropFilter: "blur(20px)",
          padding: "8px 16px",
          border: "none",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "2px",
            left: "2px",
            right: "2px",
            bottom: "2px",
            borderRadius: "1.5rem",
            background: "linear-gradient(to right, #FF3131, #B60E0E)",
            zIndex: "-1",
          },
          "&:hover": {
            boxShadow: "0px 2px 30px 0px rgba(218, 24, 27, 0.3)",
            cursor: "pointer",
          },
          "&:disabled, &.disabled": {
            background: "#353A4E", // Màu nền khác cho disabled
            cursor: "not-allowed", // Thay đổi con trỏ khi bị vô hiệu hóa
            boxShadow: "none",
            color: "#606576", // Màu chữ của button
            "&::before": {
              background: "#141720", // Background cho trước khi disabled
            },
            // Force đổi màu tất cả phần tử con bên trong
            "& *": {
              color: "#606576 !important", // Màu văn bản cho tất cả phần tử con bên trong
            },
          },
        },
      };

      addComponents(buttonStyles);
    }),
  ],
};
