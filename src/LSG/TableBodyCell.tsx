import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TableBody, TableRow, TableCell } from "@mui/material";

export type StudentList = {
  student_id: number;
  student_name: string;
};

export type StudentListProps = {
  student: StudentList[];
};

const TableBodyCell = ({ student }: StudentListProps) => {
  const handleMemo = () => prompt("메모추가");
  const handleAtt = (v: string) => alert(`${v} 클릭`);

  return (
    <TableBody>
      {student.map(({ student_id, student_name }) => (
        <TableRow>
          <TableCell>{student_id}</TableCell>
          <TableCell>{student_name}</TableCell>
          <TableCell>
            <button
              className="mx-1 p-3 border"
              onClick={() => handleAtt("출석")}
            >
              출석
            </button>
            <button
              className="mx-1 p-3 border"
              onClick={() => handleAtt("지각")}
            >
              지각
            </button>
            <button
              className="mx-1 p-3 border"
              onClick={() => handleAtt("결석")}
            >
              결석
            </button>
          </TableCell>
          <TableCell>
            <AddCircleOutlineOutlinedIcon />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyCell;
