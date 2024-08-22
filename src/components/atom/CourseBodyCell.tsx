import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TableBody, TableRow, TableCell } from "@mui/material";

export type CourseStudentList = {
  student_id: number;
  student_name: string;
  student_email: string;
};

export type CourseStudentListProps = {
  student: CourseStudentList[];
};

const CourseBodyCell = ({ student }: CourseStudentListProps) => {
  const handleMemo = () => prompt("메모추가");
  const handleAtt = (v: string) => alert(`${v} 클릭`);

  return (
    <TableBody>
      {student.map(({ student_id, student_name, student_email }) => (
        <TableRow>
          <TableCell>{student_id}</TableCell>
          <TableCell>{student_name}</TableCell>
          <TableCell>{student_email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CourseBodyCell;
