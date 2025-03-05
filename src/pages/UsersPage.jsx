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

const UsersPage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const { users, loading, error } = useGetAllUsers();

    // State for menu actions
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Open menu
    const handleMenuOpen = (event, userId) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(userId);
    };

    // Close menu
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    // Action handlers
    const handleEdit = () => {
        console.log(`Edit User: ${selectedUser}`);
        handleMenuClose();
    };

    const handleDelete = () => {
        console.log(`Delete User: ${selectedUser}`);
        handleMenuClose();
    };

    const handleView = () => {
        console.log(`View User: ${selectedUser}`);
        handleMenuClose();
    };

    // Define User Columns
    const Usercolumns = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 80 },
        {
            field: 'imageUrl',
            headerName: 'Avatar',
            flex: 1,
            minWidth: 50,
            renderCell: (params) => (
              <Box sx={{  display: 'flex', mt:"5px" }}>
              <Avatar src={params.value} alt="User Avatar" sx={{ width: 43, height: 43,  }} />
          </Box>
            ),
        },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 120 },
        { field: 'role', headerName: 'Role', flex: 1, minWidth: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 50,
            renderCell: (params) => (
                <>
                    <IconButton size="small" sx={{ p: 0.5 }} onClick={(event) => handleMenuOpen(event, params.row.id)}>
                      <MoreVert fontSize="small"   />
                    </IconButton>
                    
                </>
            ),
        },
    ];

    // Map API data to Userrows
    const Userrows = users?.map((user) => ({
        id: user.id,
        imageUrl: user.imageUrl ? `${baseUrl}${user.imageUrl}` : '/default-avatar.png',
        name: user.name || '-',
        role: user.role,
    }));

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                User Details
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                <Button variant="contained" sx={{ fontWeight: 600 }} onClick={() => setModalOpen(true)}>
                    User Model
                </Button>
                <Button variant="contained" sx={{ fontWeight: 600 }} onClick={() => setCreateModalOpen(true)}>
                    Add User
                </Button>
            </Box>
            <Grid spacing={5} columns={5}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <UserCustomizedDataGrid Userrows={Userrows} Usercolumns={Usercolumns}
                     
                    />
                </Grid>
            </Grid>
            {/* User Modal */}
            <UserModelModal open={modalOpen} handleClose={() => setModalOpen(false)} />
            <CreateUserModal open={createModalOpen} handleClose={() => setCreateModalOpen(false)} />

            {/* Three Dots Menu */}
            <Menu  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleView}>View</MenuItem>
            </Menu>
        </Box>
    );
};

export default UsersPage;
