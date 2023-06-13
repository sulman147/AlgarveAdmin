// import React from "react";
// // import { DataGrid } from "@material-ui/data-grid";
// import { Button } from "@material-ui/core";

// const AllBlogs = () => {
//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "title", headerName: "Title", width: 200 },
//     { field: "videoUrl", headerName: "Video URL", width: 200 },
//     { field: "description", headerName: "Description", width: 300 },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       renderCell: (params) => (
//         <>
//           <Button variant="contained" color="primary" size="small">
//             Edit
//           </Button>
//           <Button variant="contained" color="secondary" size="small">
//             Delete
//           </Button>
//         </>
//       ),
//     },
//   ];

//   const rows = [
//     {
//       id: 1,
//       title: "Blog 1",
//       videoUrl: "https://example.com/video1",
//       description: "Lorem ipsum dolor sit amet.",
//     },
//     {
//       id: 2,
//       title: "Blog 2",
//       videoUrl: "https://example.com/video2",
//       description: "Consectetur adipiscing elit.",
//     },
//     // Add more dummy data as needed
//   ];

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid columns={columns} rows={rows} pageSize={5} />
//     </div>
//   );
// };

// export default AllBlogs;
