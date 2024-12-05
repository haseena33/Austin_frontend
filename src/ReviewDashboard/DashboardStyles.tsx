import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
 
export const ImprestStock = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  margin: '16px 0',
});
 
export const DashboardIcon = styled(Box)({
  width: '20px',
  marginRight: '10px',
  height: "23px"
});
 
export const DashboardTitleText = styled(Typography)({
  color: "#00000080",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 900,
  lineHeight: "normal",
  letterSpacing: "-0.16px",
})
 
export const CommonTextCount = styled(Typography)(({ color }: any) => ({
  color:color,
  fontFamily: 'Inter',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 900,
  lineHeight: '30px',
}));
 
export const CommonText = styled(Typography)(({ color }: any) => ({
  color: color,
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '20px',
  letterSpacing: '-0.36px',
  textTransform: "capitalize",
  paddingTop: "10px"
}));
 
export const GridCards = styled(Grid)(() => ({
  textAlign: "center",
  minHeight: "75px",
  borderRadius: "5px",
  cursor: "pointer"
}));
 