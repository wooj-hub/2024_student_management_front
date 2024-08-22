import { TableBody, TableRow, TableCell } from "@mui/material";

// type Subject = {
//   name: string;
//   schedule: string;
// };

type Tutors = {
  tutor_id: number;
  tutor_name: string;
  tutor_phone: string;
  tutor_email: string;
  curriculum_id: number;
  // subjects: Subject[];
};

type TableBodyContentsProps = {
  tutors: Tutors[];
};

const TableBodyContents = ({ tutors }: TableBodyContentsProps) => {
  return (
    <TableBody>
      {tutors.map((tutors) => (
        // tutors.subjects.map((subject, index) => (
        <TableRow>
          <TableCell>{tutors.tutor_id}</TableCell>
          <TableCell>{tutors.tutor_name}</TableCell>
          <TableCell>{tutors.tutor_phone}</TableCell>
          <TableCell>{tutors.tutor_email}</TableCell>
          <TableCell>{tutors.curriculum_id}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyContents;
