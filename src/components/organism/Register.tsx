import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import StudentList, { StuProps } from "../../황승우/StudentList";
import AddButton from "../../황승우/AddButton";
import CourseList from "../../황승우/CourseList";

export const Register = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [id, setId] = useState<number>(0);
  const [addStu, setStu] = useState<StuProps[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [handleCheck, setHandleCheck] = useState<boolean[]>([]);

  function selectCheckAll() {
    setCheckedAll((prev) => !prev);
    const array = new Array(addStu.length).fill(!checkedAll);
    setHandleCheck(array);
  }

  const handleCheckBox = (position: number) => {
    const newCheckState = handleCheck.map((v, i) => (i === position ? !v : v));
    setHandleCheck(newCheckState);
    const checkedLen = newCheckState.filter(Boolean).length;
    setCheckedAll(checkedLen === newCheckState.length);
  };

  const clickRegister = () => {
    if (
      addStu.some(
        (v) =>
          !v.student_name ||
          !v.student_email ||
          !v.student_phone ||
          !v.course_id
      )
    ) {
      alert("학생을 등록하지 못했습니다. 등록란에 올바르게 작성해주세요.");
    } else {
      fetch("http://localhost:3001/student/register", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addStu),
      })
        .then((v) => v.json())
        .then(() => {
          alert("등록완료");
        });
    }
  };

  const registerButton = () => {
    const newStu = {
      id,
      student_name: "",
      student_email: "",
      student_phone: "",
      course_id: "",
      course_name: "",
    };
    setStu((prev) => {
      const updatedStu = [...prev, newStu];
      setHandleCheck((prev) => [...prev, false]);
      setId((prev) => prev + 1);
      return updatedStu;
    });
  };

  const updateStudent = (index: number, updatedStudent: StuProps) => {
    setStu((prev) => {
      const newStudents = [...prev];
      newStudents[index] = updatedStudent;
      return newStudents;
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
      <div className="text-7xl text-center">학생 등록 페이지</div>
      <div>
        <Button variant="contained" onClick={clickRegister}>
          등록하기
        </Button>
      </div>
      <div className="w-5/6">
        <table className="border w-full">
          <thead>
            <tr>
              <th>
                <Checkbox
                  {...label}
                  checked={checkedAll}
                  onClick={selectCheckAll}
                />
              </th>
              <th>학생명</th>
              <th>이메일</th>
              <th>전화번호</th>
              <th>수강 수업</th>
              <th>
                <AddButton handleClick={registerButton} />
              </th>
            </tr>
          </thead>
          <tbody>
            {addStu.map((v, i) => (
              <StudentList
                key={v.id}
                isChecked={handleCheck[i]}
                setChange={() => handleCheckBox(i)}
                updateStudent={(updatedStudent) =>
                  updateStudent(i, updatedStudent)
                }
                {...v}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Register;
