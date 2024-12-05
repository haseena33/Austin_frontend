import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Box,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from 'react-router-dom';
import { GridCards, ImprestStock } from "../ReviewDashboard/DashboardStyles";

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
  // PreCommitteeComments: string;
  // PreCommitteeChange: string;
  DIaccept: boolean;
  PreCommitteeaccept: boolean;
  CommitteeComments: string;
  CommitteeChange: string;
  // Committeeaccept: boolean;
  RequestNo: number;
  RequestType: string;
  ShortTitle: string;
  uid: number;
  DateOpen: Date;
  DateClose: Date;
  NoofDays: number;
  ReviewOutcome: string;
  Status:string;
  Name_Of_Study_Team:string;
  Infrastructurecomments:string;
  InfrastructureChange:string;
  Assign_to_dandicommittee:boolean
  Assign_to_committeeDIComments:string
  Committee_request_more_info:string
  Committeeaccept:boolean
}

const Committee: React.FC = () => {
  const [data, setData] = useState<Lodge[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Lodge | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [commetecomments, setCommeteComments] = useState("");
  const [commetechangesRequired, setCommeteChangesRequired] = useState("");
  const [requestInfoDialogOpen, setRequestInfoDialogOpen] = useState(false);
  const [requestInfo, setRequestInfo] = useState("");
  useEffect(() => {
    const fetchAcceptedLodges = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/lodgeform/");
        const acceptedLodges = response.data.filter(
          (lodge: Lodge) => lodge.Assign_to_dandicommittee && lodge.is_accept
        );
        setData(acceptedLodges);
      } catch (error) {
        console.error("Error fetching accepted lodge requests:", error);
      }
    };

    fetchAcceptedLodges();
  }, []);

  const handleCardClick = async (item: Lodge) => {
    setDialogOpen(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/lodgeform/${item.id}/`
      );
      setSelectedItem(response.data);
      setRequestInfo(response.data.Committee_request_more_info)
      setCommeteComments(response.data.CommitteeComments)
      setCommeteChangesRequired(response.data.CommitteeChange)

    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleAccept = async () => {
    if (selectedItem) {
      try {
        const updatedLodge = {
          id: selectedItem.id,
          CommitteeComments: commetecomments || '',
          CommitteeChange:commetechangesRequired || '',
          Committee_request_more_info : requestInfo || '',
          Committeeaccept:true,
          Status: "Completed",  // Ensure this matches the choice in the model

        };

        console.log('Updating lodge with data:', updatedLodge);

        await axios.put(`http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`, updatedLodge);
        setSnackbarMessage('Lodge accepted successfully.');
        setSnackbarOpen(true);
        handleDialogClose();
        
        setData((prevData) =>
          prevData.map((lodge) => (lodge.id === selectedItem.id ? { ...lodge, ...updatedLodge } : lodge))
        );
      } catch (error) {
        console.error('Error accepting lodge:', error);
        setSnackbarMessage('Error accepting lodge.');
        setSnackbarOpen(true);
      }
    }
  };
console.log(selectedItem,"haseena")
  const handleReject = async () => {
    if (selectedItem) {
      try {
        const updatedLodge = {
          id: selectedItem.id,
          CommitteeComments: commetecomments || '',
          CommitteeChange:commetechangesRequired || '',
          Committee_request_more_info : requestInfo || '',
          Status:"rejected",
          // PreCommitteeaccept:false,
        };

        await axios.put(`http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`, updatedLodge);
        setSnackbarMessage('Lodge rejected successfully.');
        setSnackbarOpen(true);
        handleDialogClose();

        setData((prevData) =>
          prevData.map((lodge) => (lodge.id === selectedItem.id ? { ...lodge, ...updatedLodge } : lodge))
        );
      } catch (error) {
        console.error('Error rejecting lodge:', error);
        setSnackbarMessage('Error rejecting lodge.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleRequestMoreInfo = () => {
    setRequestInfoDialogOpen(true);
  };

  const handleRequestInfoClose = () => {
    setRequestInfoDialogOpen(false);
    // setRequestInfo(""); // Reset the input value
  };

  const handleSubmitRequestInfo = async () => {
    if (selectedItem) {
      try {
        const updatedLodge = {
          id: selectedItem.id,
          CommitteeComments: commetecomments || '',
          CommitteeChange: commetechangesRequired || '',
          Committee_request_more_info : requestInfo || '',

          // RequestNo: selectedItem.RequestNo + 1, // Increment request number or however you want to handle this
          // RequestType: requestInfo,
        };

        await axios.put(`http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`, updatedLodge);
        setSnackbarMessage('Request for more info submitted successfully.');
        setSnackbarOpen(true);
        handleRequestInfoClose();
      } catch (error) {
        console.error('Error requesting more info:', error);
        setSnackbarMessage('Error requesting more info.');
        setSnackbarOpen(true);
      }
    }
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Grid item lg={12}>
          <ImprestStock>
            <Typography variant="h6" sx={{ marginLeft: 2 }}>
              Committee Review
            </Typography>
          </ImprestStock>
          <Grid container spacing={5}>
            {data.map((item) => (
              <Grid item xs={3.5} key={item.id}>
                <GridCards
                  onClick={() => handleCardClick(item)}
                  bgcolor="#b2c9e6"
                  sx={{
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100px',
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { transform: 'scale(1.02)' },
                    overflow: 'hidden',
                  }}
                >
                  <Typography variant="body2">{item.Title}</Typography>
                </GridCards>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        PaperProps={{
          sx: {
            width: '80%', 
            maxWidth: 'none', 
          },
        }} 
      >
        <Box
          sx={{
            backgroundColor: "#004CAC",
            color: "white",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", 
            padding: "0 8px",
          }}
        >
          <DialogTitle
            sx={{ margin: 0, padding: 0 }} 
          >
            <Typography>Project/Review</Typography>
          </DialogTitle>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            aria-label="close"
            sx={{ position: "absolute", right: 10, top: 3 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Protocol Title"
                size="small"
                value={selectedItem?.Title || ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="UID"
                size="small"
                value={selectedItem?.uid|| ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Lead HREC Number"
                size="small"
                // value={selectedItem?.Title || ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                size="small"
                value={selectedItem?.Description || ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Methodology"
                size="small"
                value={selectedItem?.Methodology || ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Objectives"
                size="small"
                value={selectedItem?.Objectives || ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Document Upload"
                value={selectedItem?.Document_Upload.join(", ") || ""}
                variant="outlined"
                multiline
                rows={3}
                InputProps={{ readOnly: true ,sx: { fontSize: '0.875rem' }}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                size="small"
                value={selectedItem?.Status || ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Review Outcome"
                size="small"
                // value={selectedItem?.Objectives || ""}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                {selectedItem?.is_accept ? "Accepted" : "Not Accepted"}
              </Typography>
            </Grid> */}
          </Grid>
        </DialogContent>
{/* 
        <Box
          sx={{
            backgroundColor: "#E1255A",
            color: "white",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8px", 
          }}
        >
          <DialogTitle
            sx={{ margin: 0, padding: 0 }} 
          >
            <Typography>D&I Review</Typography>
          </DialogTitle>
        </Box>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Comments"
                size="small"
                variant="outlined"
                value={selectedItem?.DIComments || ""}
                InputProps={{ readOnly: true,sx: { fontSize: '0.875rem' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Changes Required comments"
                size="small"
                variant="outlined"
                value={selectedItem?.DIChange || ""}
                // onChange={(e) => setChangesRequired(e.target.value)}
                InputProps={{ readOnly: true ,sx: { fontSize: '0.875rem' }}}
              />
            </Grid>
          </Grid>
        </DialogContent> */}

        <Box
          sx={{
            backgroundColor: "#004CAC",
            color: "white",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 8px", 
          }}
        >
          <DialogTitle
            sx={{ margin: 0, padding: 0 }} 
          >
            <Typography>Committee Review</Typography>
          </DialogTitle>
        </Box>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Comments"
                size="small"
                variant="outlined"
                value={commetecomments}
                onChange={(e) => setCommeteComments(e.target.value)}
                InputProps={{sx: { fontSize: '0.875rem' }}}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Changes Required comments"
                size="small"
                variant="outlined"
                value={commetechangesRequired}
                onChange={(e) => setCommeteChangesRequired(e.target.value)}
                InputProps={{sx: { fontSize: '0.875rem' }}}

              />
            </Grid>
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
            <Button variant="contained" sx={{ marginRight: 1, backgroundColor: "#326fbc" }} onClick={handleDialogClose}>
            Back
          </Button>
          {/* <Button onClick={handleAccept} variant="contained" sx={{ marginRight: 1, backgroundColor: "#E1255A" }}>
            Assign to committee
          </Button> */}
          <Button onClick={handleAccept} variant="contained" sx={{ marginRight: 1, backgroundColor: "#326fbc" }}>
            Approvel Request
          </Button>
          <Button onClick={handleReject} variant="contained" sx={{ backgroundColor: "#326fbc" }}>
            Widthdraw Request
          </Button>
          <Button onClick={handleRequestMoreInfo} variant="contained" sx={{ backgroundColor: "#326fbc" }}>
            Request More Info
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={requestInfoDialogOpen}
        onClose={handleRequestInfoClose}
        fullWidth
      >
        <DialogTitle>Request More Information</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Additional Information Needed"
            variant="outlined"
            value={requestInfo}
            onChange={(e) => setRequestInfo(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestInfoClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitRequestInfo} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default Committee;