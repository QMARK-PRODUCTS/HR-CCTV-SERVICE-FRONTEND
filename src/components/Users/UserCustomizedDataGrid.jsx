import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import useGetAllUsers from '../../hooks/useGetAllUsers';
import { baseUrl } from '../../utils/Endpoint';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { toast } from 'react-toastify';


const UserCustomizedDataGrid = () => {
  const { users, loading, error } = useGetAllUsers();
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

    const handleDelete = async() => {
        console.log(`Delete User: ${selectedUser}`);
        if (!selectedUser) return;
        try {
          const response = await axios.delete(`/api/v1/people/${selectedUser}`)
          if (response.status === 200) {
            toast.success('User deleted successfully');
            // Refresh the user list (if applicable)
            window.location.reload()
        }
        } catch (error) {
          console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
        }finally {
          handleMenuClose();
      }
  
    };

    const handleView = () => {
        console.log(`View User: ${selectedUser}`);
        handleMenuClose();
    };
  // Map API data to Userrows
  const Userrows = users?.map((user) => ({
      id: user.id,
      imageUrl: user.imageUrl ? `${baseUrl}${user.imageUrl}` : '/default-avatar.png',
      name: user.name || '-',
      role: user.role,
  }));

  return (
    <>
       <DataGrid
         checkboxSelection
         rows={Userrows}
         columns={Usercolumns}
         rowHeight={70} 
         getRowClassName={(params) =>
           params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
         }
         initialState={{
           pagination: { paginationModel: { pageSize: 20 } },
         }}
         pageSizeOptions={[10, 20, 50]}
         disableColumnResize
         density="compact"
         slotProps={{
           filterPanel: {
             filterFormProps: {
               logicOperatorInputProps: {
                 variant: 'outlined',
                 size: 'small',
               },
               columnInputProps: {
                 variant: 'outlined',
                 size: 'small',
                 sx: { mt: 'auto' },
               },
               operatorInputProps: {
                 variant: 'outlined',
                 size: 'small',
                 sx: { mt: '10px' },
               },
               valueInputProps: {
                 InputComponentProps: {
                   variant: 'outlined',
                   size: 'small',
                 },
               },
             },
           },
         }}
       />
          

            {/* Three Dots Menu */}
            <Menu  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleView}>View</MenuItem>
            </Menu>
    </>
     );
}

export default UserCustomizedDataGrid;