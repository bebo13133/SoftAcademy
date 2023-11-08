import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const IsLoading=()=>{
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width:"300px" }}>
      <CircularProgress color="primary" size={40} thickness={4} />
      <CircularProgress color="secondary" size={40} thickness={4} />
      <CircularProgress style={{ color: 'red' }} size={40} thickness={4} />
    </div>
    )
}