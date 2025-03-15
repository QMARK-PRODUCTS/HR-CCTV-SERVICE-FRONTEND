import { useState } from 'react';
import { Button, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import UserCustomizedDataGrid from '../components/Users/userCustomizedDataGrid';
import UserModelModal from '../components/Users/UserModelModal';
import CreateUserModal from '../components/Users/CreateUserModal';
import useGetAllUsers from '../hooks/useGetAllUsers';
import { baseUrl } from '../utils/Endpoint';
import axios from '../axios/axios';
import { toast } from 'react-toastify';

const UsersPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                User Details
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                <Button variant="contained" sx={{ fontWeight: 600 }} onClick={() => setModalOpen(true)}>
                    Add Model
                </Button>
                <Button variant="contained" sx={{ fontWeight: 600 }} onClick={() => setCreateModalOpen(true)}>
                    Add People
                </Button>
            </Box>
            <Grid  spacing={5} columns={5}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <UserCustomizedDataGrid
                     
                    />
                </Grid>
            </Grid>
            {/* User Modal */}
            <UserModelModal open={modalOpen} handleClose={() => setModalOpen(false)} />
            <CreateUserModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)} />

          
        </Box>
    );
};

export default UsersPage;
