import { Link } from "react-router-dom";
import LogoIcon from "../assets/roadfriendlogo.png";


export default function Navbar() {
  return (
    <nav className="px-8 py-4 bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-start">
        {/* 왼쪽 영역 */}
        <div className="flex items-center gap-2">
  <Link to="/" className="flex items-center gap-1">
  <img
    src={LogoIcon}
    alt="길친구 로고"
    className="w-16 h-16 -mr-2"
  />
  <span className="font-myfont text-blue-300 text-3xl font-bold hover:text-blue-400">
    길친구
  </span>
</Link>
</div>
        {/* 오른쪽 영역: 로그인/회원가입/마이페이지 */}
        <div className="flex gap-4 text-sm text-gray-600 mt-2">
          <Link to="/login" className="text-black font-bold hover:text-blue-400">로그인</Link>
          <span>|</span>
          <Link to="/signup" className="text-black font-bold hover:text-blue-400">회원가입</Link>
          <span>|</span>
          <Link to="/mypage" className="text-black font-bold hover:text-blue-400">마이페이지</Link>
        </div>
      </div>

       {/* 메뉴 */}
          <div className="flex justify-center items-center gap-40">
            <Link to="/reviews" className="text-black font-bold hover:text-blue-400">버스정류장 리뷰</Link>
            <Link to="/board" className="text-black font-bold hover:text-blue-400">지역 간 경로 게시판</Link>
            <Link to="/insight" className="text-black font-bold hover:text-blue-400">교통 인사이트</Link>
             <Link to="/gpt" className="text-black font-bold hover:text-blue-400">AI 길찾기</Link>
          </div>
    </nav>
  );
}