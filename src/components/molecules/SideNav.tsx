import axios from "axios";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await axios.post("http://localhost:3001/tutor/login").then((res) => {
      //로그아웃은 버튼 누르면
      localStorage.clear();
      navigate("/");
    });
  };
  return (
    <div className="h-full px-16 py-10 bg-slate-200 flex flex-col items-center gap-40 text-nowrap">
      <div className="flex flex-col justify-center items-center gap-5">
        <button
          onClick={handleClick}
          className="bg-slate-500 text-white px-5 py-1 mb-5"
        >
          로그아웃
        </button>
        <a href="/main" className="w-20 h-20 bg-black rounded-full"></a>
        <a href="/changeinfo">정보수정</a>
        <a href="/register">학생등록</a>
      </div>

      <div className="flex flex-col gap-5">
        <a href="/classcontent">수업1</a>
      </div>
    </div>
  );
};

export default SideNav;
