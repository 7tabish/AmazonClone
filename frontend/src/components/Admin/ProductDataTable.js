import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

  
// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   {field: 'mainCategory',headerName: 'Main Category',sortable: false,width: 200},
//   {field: 'subCategory',headerName: 'Child Category',sortable: false,width: 200},
//   { field: 'title', headerName: 'Title', width: 170 },
//   { field: 'price', headerName: 'Price ($)', width: 170 },
//   { field: 'brand', headerName: 'Brand', sortable: false, width: 170},
//   { field: 'condition', headerName: 'Condition', sortable: false, width: 170}
// ];

// const rows = [
//   { id: 1, mainCategory: 'Clothes', subCategory: 'Narrow trousers',
//    title: 'bottm narrow trousers for men', price: 23.3,
//   brand: 'Armani', condition: 'new' },
// ];

export default function DataTable(props) {
  const {columns, rows, onRowSelected} = props; 

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
       rows={rows}
        columns={columns}
        onRowSelected ={onRowSelected}  
        pageSize={5} checkboxSelection />
    </div>
  );
}