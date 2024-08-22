import { Table, TableHead, TableRow, TableCell } from "@mui/material";
import CourseBodyCell, { CourseStudentListProps } from "./CourseBodyCell";

const CourseStudent = ({ student }: CourseStudentListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>학생번호</TableCell>
          <TableCell>학생이름</TableCell>
          <TableCell>이메일</TableCell>
        </TableRow>
      </TableHead>
      <CourseBodyCell student={student} />
    </Table>
  );
};

export default CourseStudent;
