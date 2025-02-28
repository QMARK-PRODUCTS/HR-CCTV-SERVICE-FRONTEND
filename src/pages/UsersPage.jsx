import * as React from 'react';
import { Button, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import UserCustomizedDataGrid from '../components/Users/userCustomizedDataGrid';
import UserModelModal from './UserModelModal';



const UsersPage = () => {
    const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        User Details
      </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
        <Button 
        variant="contained" 
         sx={{ fontWeight: 600 }} 
         onClick={() => setModalOpen(true)}
        >User Model</Button>
        <Button variant="contained" sx={{ fontWeight: 600 }}>Add User</Button>
      </Box>
      <Grid  spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <UserCustomizedDataGrid />
        </Grid>
        </Grid>
           {/* User Modal */}
      <UserModelModal open={modalOpen} handleClose={() => setModalOpen(false)} />
        </Box>
  )
}

export default UsersPage
