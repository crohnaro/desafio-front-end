import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "#e2e2e2"}}>
          <Typography variant="h6" color="black" component="div">
            LOGO
          </Typography>
          <Box sx={{ display: "flex", gap: "10px"}}>
            <Button color='primary' variant='contained' href='/'>Containers</Button>
            <Button color='primary' variant='contained' href='/movimentacoes'>Movimentações</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}