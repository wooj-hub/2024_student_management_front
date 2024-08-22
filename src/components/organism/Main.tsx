import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import PersonalTimetable from "../../양승언/PersonalTimetable";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [tutor, setTutor] = useState<any>(null); // 튜터 정보를 저장할 상태
  const tutor_email = localStorage.getItem("email");
  const tutor_password = localStorage.getItem("password");
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/main", {
          tutor_email,
          tutor_password,
        });
        setTutor(response.data);
      } catch (error) {
        console.error("Failed to fetch tutor data:", error);
        alert("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
      }
    };

    fetchTutorData(); //email 이나 password 값이 바뀔 때마다  fetchTutorData 함수 실행.
  }, [tutor_email, tutor_password]);

  if (!tutor) {
    return <div>Loading...</div>;
  }

  // const tutors = [
  //   {
  //     tutor_id: 1,
  //     tutor_name: "abcdd",
  //     tutor_phone: "010-1234-5678",
  //     tutor_email: "abcd@gmail.com",
  //     curriculum_id: 1,
  //   },
  // ];
  return (
    <div className="flex w-full h-fit">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col w-full p-2">
          <PersonalTimetable tutors={[tutor]} />
        </div>
      </div>
      <div className="p-1 w-fit h-fit">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Main;
