import React from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";

const CityDataGrid = ({ cities, onEdit, onDelete }) => {
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    {
      field: "latlng",
      headerName: "Latitude/Longitude",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.latlng[0]}, ${params.row.latlng[1]}`,
    },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "iso2", headerName: "ISO2", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <button onClick={() => onEdit(params.row)}>Edit</button>
          <button onClick={() => onDelete(params.row)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={cities}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default CityDataGrid;
