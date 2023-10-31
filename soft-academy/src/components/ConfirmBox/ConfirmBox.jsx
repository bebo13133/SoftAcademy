import {
  Button,
  Dialog,
  DialogContent,
  Fade,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});



export const ConfirmBox = ({ open, closeDialog, title, deleteFunction }) => {

  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="md"
      scroll="body"
      onClose={closeDialog}
      // onBackdropClick={closeDialog}
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ px: 8, py: 6, position: "relative" }}>
        <IconButton
          size="medium"
          onClick={closeDialog}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          <Typography variant="h4">X</Typography>

        </IconButton>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography variant="h3">Delete {title}</Typography>

              <Typography variant="h4">
                Are you sure you want to delete this {title} ?
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <Button onClick={closeDialog} size="large" variant="contained" color="primary">
              <Typography variant="h4">Cancel</Typography>
            </Button>
            <Button onClick={deleteFunction} size="large" variant="contained" color="error">
              <Typography variant="h4">Delete</Typography>

            </Button>{" "}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );

}