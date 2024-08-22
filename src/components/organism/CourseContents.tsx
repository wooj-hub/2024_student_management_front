import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import CourseStudent from "../atom/CourseStudent";

const ClassContents = () => {
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

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl text-center my-10">수업명</div>

      <div className="px-80 flex gap-10">
        {/* 수업횟수 */}
        <div className="w-96 h-fit p-5 bg-slate-100">
          <div className="my-3 flex justify-between items-end">
            <div className="font-black text-2xl">수업진행률</div>
            <div className="text-sm">50%</div>
          </div>
          <Slider
            disabled
            size="small"
            defaultValue={50}
            aria-label="수업횟수"
          />
        </div>

        {/* 출석률 */}
        <div className="w-96 h-fit p-5 bg-slate-100">
          <div className="my-3 flex justify-between items-end">
            <div className="font-black text-2xl">학생 출석률</div>
            <div className="text-sm">80%</div>
          </div>
          <Slider disabled size="small" defaultValue={80} aria-label="출석률" />
        </div>
      </div>

      <a
        href="/attendance"
        className="w-fit h-fit px-8 py-2 my-10 bg-violet-400"
      >
        출석부 이동
      </a>

      <div className="text-3xl text-center mb-5">수강생 정보</div>
      <CourseStudent student={student} />
    </div>
  );
};

export default ClassContents;
