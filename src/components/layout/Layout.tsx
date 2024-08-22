import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../molecules/SideNav";
import Login from "../organism/Login";

const Layout = () => {
  const location = useLocation();
  // 현재 경로 정보를 가져오는 함수 선언
  const isRootPath = location.pathname === "/";
  // 현재 경로가 "/" 인지 확인하는 함수 선언

  return (
    <div className="w-full h-full flex">
      {isRootPath ? (
        <Login />
      ) : (
        <div className="w-full h-full flex">
          <SideNav />
          <Outlet />
        </div>
      )}
      {/*  <SideNav>
      <Outlet> */}
    </div>
  );
};

export default Layout;
