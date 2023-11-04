import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const IsLoading=()=>{
    return(
        <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
}