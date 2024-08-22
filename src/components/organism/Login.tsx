import { Button, TextField, SvgIcon } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      const response = await axios.post("http://localhost:3001/tutor/login", {
        email,
        password,
      });

      const json = response.data;
      if (json.isLogin === "True") {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password); // password는 로컬 스토리지에 저장하지 않는 것이 보안상 더 안전하다.
        navigate("/main");
      } else {
        alert(json.isLogin);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-3">
        <SvgIcon component={LockOpenIcon} inheritViewBox></SvgIcon>
        <h3 className="text-2xl">Sign in</h3>
        <TextField
          id="outlined-email-input"
          label="E-mail"
          type="email"
          autoComplete="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button onClick={handleClick} variant="contained">
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;

// 주소가 http://localhost:3000/ 인 로그인 페이지에서 아이디와 비밀번호를 입력하고 버튼을 누르면
// 주소가 "http://localhost:3001/tutor/login"인 서버로 아이디와 비밀번호와 함께 post되고
//서버에서 데이터 베이스와 입력한 아이디 비밀번호를 대조해서 값이 일치하는 경우   sendData.isLogin = "True"; 으로 저장해서 돌려줘서
// 다시  http://localhost:3000/ 으로 돌아와  json.isLogin === "True" 라면 로컬스토리지에 아이디와 비밀번호를 저장하고
//http://localhost:3000/main 으로 이동하는 순서 맞지?
