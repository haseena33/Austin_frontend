import { Typography } from "@mui/material";
import { styled } from "@mui/system";
 
export const LogoText = styled(Typography)(() => ({
  color: "rgb(23, 143, 178) !important",
  fontSize: "36px",
  height: "100px",
  fontFamily: "Inter",
  wordWrap: "break-word",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
}));
 
export const Text = styled(Typography)(() => ({
  color: "rgb(23, 143, 178)",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  letterSpacing: "-0.32px",
}));
 
export const loginFormStyle = {
  "& .MuiInputLabel-root": {
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    letterSpacing: "-0.16px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.75)",
    fontFamily: "Inter !important",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "normal",
    letterSpacing: "-0.16px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid rgba(0, 0, 0, 0.22)",
    fontSize: "30px",
    fontFamily: "Roboto",
    fontWeight: "bold",
    wordWrap: "break-word",
    borderRadius: "7px",
  },
  "& .MuiInputBase-input": {
    fontFamily: "Roboto",
    color: "#000000",
  },
};
 
 