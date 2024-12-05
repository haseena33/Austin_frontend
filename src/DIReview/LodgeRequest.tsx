import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Box,
  DialogTitle,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  TablePagination,
  Grid,
} from "@mui/material";
import axios from "axios";
import { tableCellClasses } from "@mui/material/TableCell";
import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from 'react-router-dom';
// import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
export interface Lodge {
  id: number;
  Title: string;
  Description: string;
  Objectives: string;
  Methodology: string;
  Document_Upload: string[];
  is_accept: boolean;
  DIComments: string;
  DIChange: string;
  DIaccept: boolean;
  PreCommitteeComments: string;
  PreCommitteeChange: string;
  PreCommitteeaccept: boolean;
  CommitteeComments: string;
  CommitteeChange: string;
  Committeeaccept: boolean;
  RequestNo: number;
  Request_Type: string;
  // ShortTitle: string;
  uid: number;
  DateOpen: Date;
  DateClose: Date;
  NoofDays: number;
  ReviewOutcome: string;
  Status: string;
  Name_Of_Study_Team: string;
  Coordinating_principal_investigator_name: string;
  Principal_investigator_name: string;
  Request_more_info: string;
  DandI_request_more_info: string;
  Committee_request_more_info: string;
}
// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.primary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LodgeRequest: React.FC = () => {
  const [data, setData] = useState<Lodge[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Lodge | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [comments, setComments] = useState("");
  // const [changesRequired, setChangesRequired] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4); // Adjust the number of rows per page
  const [moreInfoDialogOpen, setMoreInfoDialogOpen] = useState(false);
  const [additionalComments, setAdditionalComments] = useState("");

  // const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/lodgeform/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleView = async (item: Lodge) => {
    setDialogOpen(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/lodgeform/${item.id}/`
      );
      setSelectedItem(response.data);
      setAdditionalComments(response.data.Request_more_info || "");
      // setChangesRequired(response.data.DIChange || "");
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItem(null);
    // setComments("");
    // setChangesRequired("");
  };

  const handleAccept = async () => {
    if (selectedItem) {
      try {
        const updatedLodge = {
          id: selectedItem.id,
          is_accept: true,
          // DIComments: comments || "",
          // DIChange: changesRequired || "",
          // DIaccept:true,
        };

        console.log("Updating lodge with data:", updatedLodge);

        await axios.put(
          `http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`,
          updatedLodge
        );
        setSnackbarMessage("Lodge accepted successfully.");
        setSnackbarOpen(true);
        handleDialogClose();

        setData((prevData) =>
          prevData.map((lodge) =>
            lodge.id === selectedItem.id ? { ...lodge, ...updatedLodge } : lodge
          )
        );
      } catch (error) {
        console.error("Error accepting lodge:", error);
        setSnackbarMessage("Error accepting lodge.");
        setSnackbarOpen(true);
      }
    }
  };

  // const handleReject = async () => {
  //   if (selectedItem) {
  //     try {
  //       const updatedLodge = {
  //         id: selectedItem.id,
  //         is_accept: false,
  //         DIComments: comments || '',
  //         DIChange: changesRequired || '',
  //       };

  //       await axios.put(`http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`, updatedLodge);
  //       setSnackbarMessage('Lodge rejected successfully.');
  //       setSnackbarOpen(true);
  //       handleDialogClose();

  //       setData((prevData) =>
  //         prevData.map((lodge) => (lodge.id === selectedItem.id ? { ...lodge, ...updatedLodge } : lodge))
  //       );
  //     } catch (error) {
  //       console.error('Error rejecting lodge:', error);
  //       setSnackbarMessage('Error rejecting lodge.');
  //       setSnackbarOpen(true);
  //     }
  //   }
  // };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  // const handleEdit = (item: Lodge) => {
    
  //   console.log("Edit item:", item);
  // };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handlePending = () => {};
  // const handleMoreinfo = () => {
  //   setMoreInfoDialogOpen(true);
  // };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleMoreinfo = () => {
    setMoreInfoDialogOpen(true);
    // setAdditionalComments(""); // Reset comments when opening the dialog
  };
  const handleRequestMoreInfo = async () => {
    if (selectedItem) {
      try {
        const updatedLodge = {
          id: selectedItem.id,
          Request_more_info: additionalComments,
        };

        await axios.put(
          `http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`,
          updatedLodge
        );
        setSnackbarMessage("Request for more info submitted successfully.");
        setSnackbarOpen(true);
        setMoreInfoDialogOpen(false);
        setData((prevData) =>
          prevData.map((lodge) =>
            lodge.id === selectedItem.id ? { ...lodge, ...updatedLodge } : lodge
          )
        );
      } catch (error) {
        console.error("Error updating request for more info:", error);
        setSnackbarMessage("Error submitting request for more info.");
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" sx={{ marginLeft: 2 }}>
          LodgeRequest
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Request No</StyledTableCell>
                <StyledTableCell>Request Type</StyledTableCell>
                <StyledTableCell>Short Title</StyledTableCell>
                <StyledTableCell>UID</StyledTableCell>
                {/* <StyledTableCell>Action</StyledTableCell> */}
                {/* <StyledTableCell>Title</StyledTableCell> */}
                {/* <StyledTableCell>Description</StyledTableCell> */}
                <StyledTableCell>Objectives</StyledTableCell>
                <StyledTableCell>Methodology</StyledTableCell>
                <StyledTableCell>Date Opened</StyledTableCell>
                <StyledTableCell>Date Closed</StyledTableCell>
                <StyledTableCell>No of Days Until resolution</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Review outcome</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <StyledTableRow
                    key={item.id}
                    hover
                    // onClick={() => handleRowClick(item)}
                  >
                    <StyledTableCell>{item.id}</StyledTableCell>
                    <StyledTableCell>{item.Request_Type}</StyledTableCell>
                    <StyledTableCell>{item.Title}</StyledTableCell>
                    <StyledTableCell>{item.uid}</StyledTableCell>
                    {/* <StyledTableCell>{item.Title}</StyledTableCell> */}
                    {/* <StyledTableCell>{item.Description}</StyledTableCell> */}
                    <StyledTableCell>{item.Objectives}</StyledTableCell>
                    <StyledTableCell>{item.Methodology}</StyledTableCell>
                    <StyledTableCell>
                      {item.DateOpen
                        ? new Date(item.DateOpen).toLocaleDateString()
                        : new Date().toLocaleDateString()}{" "}
                      {/* Show today's date if DateOpen is absent */}
                    </StyledTableCell>

                    <StyledTableCell>
                      {item.DateClose
                        ? item.DateClose.toLocaleDateString()
                        : item.DateOpen
                        ? new Date().toLocaleDateString() // Show today's date if DateOpen is present
                        : "N/A"}
                    </StyledTableCell>

                    <StyledTableCell>{item.NoofDays}</StyledTableCell>
                    {/* <StyledTableCell>
                      {item.is_accept ? "Accepted" : "Not Accepted"}
                    </StyledTableCell> */}
                    <StyledTableCell>{item.Status}</StyledTableCell>
                    <StyledTableCell>
                      {item.DandI_request_more_info || "N/A"}
                      {item.DandI_request_more_info &&
                      item.Committee_request_more_info
                        ? " , "
                        : ""}
                      {item.Committee_request_more_info || ""}
                    </StyledTableCell>
                    <StyledTableCell>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(item);
                        }}
                        color="primary"
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 8, 12]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ backgroundColor: "#004CAC", color: "white" }}>
          <DialogTitle>
            <Typography>Project/Review</Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleDialogClose}
              aria-label="close"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        </Box>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Request Type"
                size="small"
                value={selectedItem?.Request_Type || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                size="small"
                value={selectedItem?.Title || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="UID/Protocol Number"
                size="small"
                value={selectedItem?.uid || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Methodology"
                size="small"
                value={selectedItem?.Methodology || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Description"
                size="small"
                value={selectedItem?.Description || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Objectives"
                size="small"
                value={selectedItem?.Objectives || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Co-ordinaying Principal Investigation Name"
                size="small"
                value={
                  selectedItem?.Coordinating_principal_investigator_name || ""
                }
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Principal Investigator Name"
                size="small"
                value={selectedItem?.Principal_investigator_name || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name of Study Team"
                size="small"
                value={selectedItem?.Name_Of_Study_Team || ""}
                variant="outlined"
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Document Upload"
                value={selectedItem?.Document_Upload.join(", ") || ""}
                variant="outlined"
                multiline
                rows={4}
                InputProps={{ readOnly: true, sx: { fontSize: "0.875rem" } }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                {selectedItem?.is_accept ? "Accepted" : "Not Accepted"}
              </Typography>
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            p: 2,
          }}
        >
          <Button
            onClick={handleAccept}
            variant="contained"
            sx={{ marginRight: 1, backgroundColor: "#326fbc" }}
          >
            APPROVE
          </Button>
          <Button
            onClick={handlePending}
            variant="contained"
            sx={{ backgroundColor: "#326fbc" }}
          >
            PENDING APPROVE
          </Button>
          <Button
            onClick={handleMoreinfo}
            variant="contained"
            sx={{ backgroundColor: "#326fbc" }}
          >
            REQUEST MORE INFO
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      <Dialog
        open={moreInfoDialogOpen}
        onClose={() => setMoreInfoDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Information Requested</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Additional Comments"
            variant="outlined"
            multiline
            rows={4}
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            // Add any additional state to manage input here if needed
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMoreInfoDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRequestMoreInfo} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LodgeRequest;
