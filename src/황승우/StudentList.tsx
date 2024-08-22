import { Checkbox, FormControl, NativeSelect, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export type StuProps = {
  id?: number;
  student_name?: string;
  student_email?: string;
  student_phone?: string;
  course_id?: string;
  course_name?: string; // course_name을 추가합니다.
  isChecked?: boolean;
  setChange?: () => void;
  updateStudent?: (updatedStudent: StuProps) => void;
};

const StudentList = ({
  id,
  student_name,
  student_email,
  student_phone,
  course_id,
  course_name,
  isChecked,
  setChange,
  updateStudent,
}: StuProps) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [localStudent, setLocalStudent] = useState<StuProps>({
    id,
    student_name,
    student_email,
    student_phone,
    course_id,
    course_name,
  });
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  const [courseList, setCourse] = useState<
    { course_id: string; course_name: string }[]
  >([]);
  const openList = async () => {
    const response = await fetch("http://localhost:3001/course/course_list");
    const data = await response.json();
    setCourse(data);
  };

  useEffect(() => {
    openList();
  }, []);

  const emailCheck =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  useEffect(() => {
    setEmailErr(!emailCheck.test(localStudent.student_email ?? ""));
  }, [localStudent.student_email]);

  const phoneCheck = /^(01[016789]{1})-[0-9]{3,4}-[0-9]{4}$/;
  useEffect(() => {
    setPhoneErr(!phoneCheck.test(localStudent.student_phone ?? ""));
  }, [localStudent.student_phone]);

  useEffect(() => {
    if (updateStudent) {
      updateStudent(localStudent);
    }
  }, [localStudent, updateStudent]);

  const handleChange =
    (v: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalStudent((prev) => ({
        ...prev,
        [v]: value,
      }));
    };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectCourseId = e.target.value;
    const selectCourse = courseList.find(
      (course) => course.course_id === selectCourseId
    );
    setLocalStudent((prev) => ({
      ...prev,
      course_id: selectCourseId,
      course_name: selectCourse?.course_name ?? "",
    }));
  };

  return (
    <>
      <tr>
        <td>
          <Checkbox {...label} checked={isChecked} onChange={setChange} />
        </td>
        <td>
          <TextField
            id="outlined-basic"
            label="이름"
            variant="outlined"
            value={localStudent.student_name}
            onChange={handleChange("student_name")}
          />
        </td>
        <td>
          <div className="flex">
            <div className="">
              <TextField
                required
                id="outlined-required"
                label="E-mail"
                value={localStudent.student_email}
                onChange={handleChange("student_email")}
                error={emailErr}
                helperText={
                  emailErr ? "올바른 이메일 형식으로 입력해주세요." : ""
                }
              />
            </div>
          </div>
        </td>
        <td>
          <div className="flex">
            <div className="">
              <TextField
                required
                id="outlined-required"
                label="전화번호"
                value={localStudent.student_phone}
                onChange={handleChange("student_phone")}
                error={phoneErr}
                helperText={
                  phoneErr
                    ? "올바른 전화번호 형식 또는 -을 추가해 입력해주세요."
                    : ""
                }
              />
            </div>
          </div>
        </td>
        <td>
          <FormControl fullWidth>
            <NativeSelect
              value={localStudent.course_id}
              onChange={handleCourseChange}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              {courseList.map((v) => (
                <option key={v.course_id} value={v.course_id}>
                  {v.course_name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </td>
      </tr>
    </>
  );
};

export default StudentList;
