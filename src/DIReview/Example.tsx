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
  PreCommitteeComments: string;
  PreCommitteeChange: string;
  DIaccept: boolean;
  PreCommitteeaccept: boolean;
  CommitteeComments: string;
  CommitteeChange: string;
  Committeeaccept: boolean;
}

interface Field {
  label: string;
  value: string | undefined;
  isEditable?: boolean;
}

const CommitteeReview: React.FC = () => {
  const [data, setData] = useState<Lodge[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Lodge | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [committeecomments, setCommitteeComments] = useState("");
  const [committeechangesRequired, setCommitteeChangesRequired] = useState("");

  useEffect(() => {
    const fetchAcceptedLodges = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/lodgeform/");
        const acceptedLodges = response.data.filter(
          (lodge: Lodge) =>
            lodge.DIaccept && lodge.is_accept && lodge.PreCommitteeaccept
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
      const response = await axios.get(`http://127.0.0.1:8000/lodgeform/${item.id}/`);
      setSelectedItem(response.data);
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
          CommitteeComments: committeecomments || "",
          CommitteeChange: committeechangesRequired || "",
          Committeeaccept: true,
        };

        await axios.put(`http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`, updatedLodge);
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

  const handleReject = async () => {
    if (selectedItem) {
      try {
        const updatedLodge = {
          id: selectedItem.id,
          CommitteeComments: committeecomments || "",
          CommitteeChange: committeechangesRequired || "",
          Committeeaccept: false,
        };

        await axios.put(`http://127.0.0.1:8000/lodgeform/${selectedItem.id}/`, updatedLodge);
        setSnackbarMessage("Lodge rejected successfully.");
        setSnackbarOpen(true);
        handleDialogClose();

        setData((prevData) =>
          prevData.map((lodge) =>
            lodge.id === selectedItem.id ? { ...lodge, ...updatedLodge } : lodge
          )
        );
      } catch (error) {
        console.error("Error rejecting lodge:", error);
        setSnackbarMessage("Error rejecting lodge.");
        setSnackbarOpen(true);
      }
    }
  };

  const handleRequest = () => {
    // Implement request changes logic if necessary
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const sections = [
    {
      title: "Project",
      fields: [
        { label: "Title", value: selectedItem?.Title },
        { label: "Description", value: selectedItem?.Description },
        { label: "Objectives", value: selectedItem?.Objectives },
        { label: "Methodology", value: selectedItem?.Methodology },
        { label: "Document Upload", value: selectedItem?.Document_Upload.join(", ") },
      ] as Field[],
    },
    {
      title: "D&I Review",
      fields: [
        { label: "Comments", value: selectedItem?.DIComments },
        { label: "Changes Required comments", value: selectedItem?.DIChange },
      ] as Field[],
    },
    {
      title: "Pre-Committee Review",
      fields: [
        { label: "Comments", value: selectedItem?.PreCommitteeComments },
        { label: "Changes Required comments", value: selectedItem?.PreCommitteeChange },
      ] as Field[],
    },
    {
      title: "Committee Review",
      fields: [
        { label: "Comments", value: committeecomments, isEditable: true },
        { label: "Changes Required comments", value: committeechangesRequired, isEditable: true },
      ] as Field[],
    },
  ];

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowX: "hidden",
        }}
      >
        <Grid item lg={12}>
          <ImprestStock>
            <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: 'bold' }}>
              Committee Review
            </Typography>
          </ImprestStock>
          <Grid container spacing={3}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <GridCards
                  onClick={() => handleCardClick(item)}
                  bgcolor="#335BA51F"
                  sx={{
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': { transform: 'scale(1.02)' },
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100px',
                  }}
                >
                  <Typography variant="body2" sx={{ padding: 2, textAlign: 'center' }}>
                    {item.Title}
                  </Typography>
                </GridCards>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
      <DialogContent>
  {sections.map((section, index) => (
    <Box key={index} sx={{ marginBottom: 2 }}>
      
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "#E1255A",
          color: "white",
          padding: 1,
          marginBottom: 2,
          width: '100%', // Ensure full width
          textAlign: 'left', // Align text if needed
        }}
      >
        {section.title}
      </Typography>
      <Grid container spacing={2}>
        {section.fields.map((field, fieldIndex) => (
          <Grid item xs={12} sm={6} key={fieldIndex}>
            <TextField
              fullWidth
              label={field.label}
              size="small"
              value={field.isEditable ? field.value : field.value || ""}
              variant="outlined"
              InputProps={{ readOnly: !field.isEditable, sx: { fontSize: '0.875rem' } }}
              onChange={field.isEditable ? (e) => {
                if (field.label === "Comments") setCommitteeComments(e.target.value);
                else if (field.label === "Changes Required comments") setCommitteeChangesRequired(e.target.value);
              } : undefined}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  ))}
</DialogContent>


        <DialogActions sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Button
            onClick={handleAccept}
            variant="contained"
            sx={{ marginRight: 1, backgroundColor: "#E1255A", '&:hover': { backgroundColor: '#c11040' } }}
          >
            Accept
          </Button>
          <Button
            onClick={handleReject}
            variant="contained"
            sx={{ backgroundColor: "#E1255A", '&:hover': { backgroundColor: '#c11040' } }}
          >
            Reject
          </Button>
          <Button
            onClick={handleRequest}
            variant="contained"
            sx={{ backgroundColor: "#E1255A", '&:hover': { backgroundColor: '#c11040' } }}
          >
            Request changes
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

export default CommitteeReview;
