import { FormControl, NativeSelect } from "@mui/material";
import { useState } from "react";

export type CourseListProps = {
  course_id?: number;
  course_name?: string;
};

const CourseList = ({ course_id, course_name }: CourseListProps) => {
  const [data, setData] = useState<CourseListProps[]>([]);
  const [courseName, setCourseName] = useState<CourseListProps[]>([]);

  const ifd = () => {
    const setData = [course_id, course_name];
    fetch("http://localhost:3001/course/course_name", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(setData),
    });
  };

  return (
    <>
      <FormControl fullWidth>
        <NativeSelect
          // onClick={ifd}
          value={course_name}
          defaultValue={"kor"}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          {/* {data.map((v, i) => (
            <option>{v.course_name}</option>
          ))} */}
          <option value={"1"}>1</option>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
          <option value={"4"}>4</option>
          <option value={"5"}>5</option>
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default CourseList;
