import { useEffect, useState } from "react";
import StudentList from "../../LSG/StudentList";

const Attendance = () => {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    const fetchStu = async () => {
      try {
        const data = await fetch("http://localhost:3001/api/student");
        setStudent(await data.json());
      } catch (error) {
        console.log(error);
      }
    };
    fetchStu();
  }, []);

  const today = `${new Date().getMonth() + 1}월 ${new Date().getDate()}일`;

  return (
    <div className="w-full h-full py-10 flex flex-col gap-10 items-center">
      <div className="text-5xl">{today}</div>
      <StudentList student={student} />
    </div>
  );
};

export default Attendance;
