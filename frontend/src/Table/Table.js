import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dashboard from "../Dashboard/Dashboard";

export default function BasicTable({ tableData }) {
  let rows = tableData.uploadedImages;
  return (
    <div className="table">
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "50px 50px 60px 20px #80808029",
          borderRadius: "20px",
          width: "900px",
          alignSelf: "center",
        }}
      >
        <Table
          sx={{ tableLayout: "fixed", borderRadius: "20px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{ fontSize: "20px", color: "green", fontWeight: "bold" }}
              >
                Image
              </TableCell>
              {/* <TableCell align="left">Name</TableCell>
              <TableCell align="left">URL</TableCell> */}
              <TableCell
                align="center"
                style={{ fontSize: "20px", color: "green", fontWeight: "bold" }}
              >
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ fontSize: "17px" }}
                  >
                    {row.name}
                  </TableCell>
                  {/* <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.link}</TableCell> */}
                  <TableCell align="center" style={{ fontSize: "17px" }}>
                    {row.uploadedAt}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}