import TableBodyCell, { StudentListProps } from "./TableBodyCell";
import { Table, TableHead, TableRow, TableCell } from "@mui/material";

const StudentList = ({ student }: StudentListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>학생번호</TableCell>
          <TableCell>학생이름</TableCell>
          <TableCell>출석여부</TableCell>
          <TableCell>비고</TableCell>
        </TableRow>
      </TableHead>
      <TableBodyCell student={student} />
    </Table>
  );
};

export default StudentList;
