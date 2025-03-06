import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const UserCustomizedDataGrid = ({Usercolumns,Userrows}) => {
  return (
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
     );
}

export default UserCustomizedDataGrid;