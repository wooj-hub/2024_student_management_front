import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        {/* <TableCell>Subject</TableCell>
        <TableCell>Schedule</TableCell> */}
        <TableCell>Phone</TableCell>
        <TableCell>EMAIL</TableCell>
        <TableCell>CURRICULUM ID</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
