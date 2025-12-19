import HeartEmptyIcon from "../assets/heart-empty.svg";
import CommentIcon from "../assets/comment.svg";
import UserIcon from "../assets/User-Thumb.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function MyPage() {

 const navigate = useNavigate();

const [nickname, setNickname] = useState("");

     const token = localStorage.getItem("accessToken"); // JWT 토큰

        const API = import.meta.env.VITE_API_URL;
        
        //닉네임 가져오기 
       useEffect(() => {
  const fetchMyInfo = async () => {
    try {

      const res = await fetch(`${API}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "유저 정보 조회 실패");
        return;
      }

      setNickname(data.nickname);
    } catch (error) {
      console.error("내 정보 조회 중 오류", error);
    }
  };

  fetchMyInfo();
}, []);


  return (
    <div className="pt-24 px-8">
      <div className="bg-white rounded-2xl border p-6">

        {/* 상단 영역 */}
        <div className="grid grid-cols-2 gap-8 mb-8">
  

          {/* 오른쪽 프로필 */}
            <div className="col-span-2 flex flex-col items-center justify-center">
    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <img src={UserIcon} alt="comment" className="w-20 h-20" />
      
    </div>
    <p className="text-gray-600">{nickname}</p>
    <div className="w-40 h-[2px] bg-gray-300 mt-2" />
  </div>
</div>

        {/* 본문 영역 */}
        <div className="grid grid-cols-12 gap-8">
          {/* 왼쪽 사이드바 */}
          <aside className="col-span-3">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-2"
              onClick={() => navigate("/mypage/myreview")}
              
              >
                            <img src={CommentIcon} alt="comment" className="w-4 h-4" />
 <span>내가 쓴 리뷰</span>
              </li>
              <li className="flex items-center gap-2"
                            onClick={() => navigate("/mypage/mycommentpost")}

              
              
              >
                                            <img src={CommentIcon} alt="comment" className="w-4 h-4" />
 <span>댓글 단 글</span>
              </li>
              <li className="flex items-center gap-2"
                            onClick={() => navigate("/mypage/mypost")}

              
              >
                                            <img src={CommentIcon} alt="comment" className="w-4 h-4" />
 <span>내가 쓴 글</span>
              </li>

              <li className="flex items-center gap-2 mt-6"
                            onClick={() => navigate("/mypage/mylikereview")}

              >
                                            <img src={HeartEmptyIcon} alt="comment" className="w-4 h-4" />
 <span>좋아요 단 리뷰</span>
              </li>
              
              <li className="flex items-center gap-2"
                                          onClick={() => navigate("/mypage/mylikepost")}

              >
                 <img src={HeartEmptyIcon} alt="comment" className="w-4 h-4" 
                 
                /> <span>좋아요 단 글</span>
              </li>

            </ul>
          </aside>

        
        </div>
      </div>
    </div>
  );
}
