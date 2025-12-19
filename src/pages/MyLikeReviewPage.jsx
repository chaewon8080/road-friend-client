import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BusStopIcon from "../assets/bus-stop.svg";
import UserIcon from "../assets/User-Thumb.svg";
import HeartEmptyIcon from "../assets/heart-empty.svg";
import HeartFillIcon from "../assets/heart-fill.svg";
import WarningIcon from "../assets/warning-circled-outline.svg";

export default function MyLikeReviewPage() {
  const navigate = useNavigate();
  const [likedReviews, setLikedReviews] = useState({}); // 리뷰별 좋아요 상태, 객체로 관리
  const [busStopName, setBusStopName] = useState("");
const [reviewsData, setReviewsData] = useState([]);
const [currentUserId, setCurrentUserId] = useState(null);
const [meEmail, setMeEmail] = useState("");
const [communityId,setCommunityId] = useState("");


    const API = import.meta.env.VITE_API_URL; 



  const token = localStorage.getItem("accessToken"); // JWT 토큰
  useEffect(() => {
  const fetchMe = async () => {
    const response = await fetch(`${API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    setCurrentUserId(data.id);     // ← 여기 들어감
     setMeEmail(data.email); 
  };

  fetchMe();
}, []);





// 내가 좋아요 한 리뷰 불러오기
  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const res = await fetch(`${API}/bus-stops/mylikereview`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "내 리뷰 조회 실패");
          return;
        }

        setReviewsData(data);

        const initLiked = {};
        for (const r of data) initLiked[r.id] = !!r.liked;
        setLikedReviews(initLiked);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMyReviews();
  }, [API, token]);




  const handleDelete = async (reviewId) => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;

  try {
    await fetch(`${API}/bus-stops/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 삭제 후 리뷰 목록 새로고침
    fetchReviews({ keyword, tags: [], sort });
    
  } catch (err) {
    console.error("삭제 실패", err);
  }
};

 const handleLike = async (reviewId) => {
  try {
    const response = await fetch(
      `${API}/bus-stops/${reviewId}/like`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json(); 

    // 화면에서 해당 리뷰 데이터 업데이트
    setReviewsData((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, likeCount: data.likeCount }
          : review
      )
    );

    // 좋아요 하트 상태 업데이트
    setLikedReviews((prev) => ({
      ...prev,
      [reviewId]: data.liked,
    }));

  } catch (err) {
    console.error("좋아요 실패", err);
  }
};


//신고 접수 

const handleReport = async (review) => {
  const reason = window.prompt("신고 사유를 입력해주세요:");
  if (!reason) return;

  try {
    const body = {
      type: "REVIEW",
      targetId: review.id,
      reporterEmail: meEmail,
      reason: reason
    };

    await fetch(`${API}/create-report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    alert("신고가 접수되었습니다.");
  } catch (err) {
    console.error("신고 실패", err);
    alert("신고 중 오류가 발생했습니다.");
  }
};




  return (
    <div className="p-6 bg-gray-50 min-h-screen">

    

      {/* 리뷰 목록 */}
      {reviewsData.map(review => (
        <div key={review.id} className="bg-white rounded-xl mb-4 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src={UserIcon} alt="icon" className="w-10 h-10" />
              <div className="text-black">{review.isAnonymous ? "익명" : `${review.authorNickName}`}</div>
            </div>
            {review.authorId === currentUserId && (
  <div className="flex gap-2">
    <button type="button" className="text-sm text-black"
      onClick={() => navigate(`/community/${review.busStopId}/edit-review/${review.id}`, { state: { review } })}
    >
      수정
    </button>

    <button type="button" className="text-sm text-black"
      onClick={() => handleDelete(review.id)}
    >
      삭제
    </button>
  </div>
)}
          </div>

          {review.imageUrl && (
            <img
              src={review.imageUrl}
              alt="리뷰 사진"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
          )}

          <p className="text-gray-800 mb-3">{review.content}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {/*  ? 의미 : 존재하면 map실행 없으면 undefined반환*/}
            {/* tag = 배열의 각 요소값, idx : 배열의 인덱스 값 */}
  {/* 카테고리 태그 */}
  {review.categoryTags?.map((tag, idx) => (
    <span key={`category-${idx}`} className="bg-blue-300 px-3 py-1 rounded-full text-sm text-white">
      # {tag}
    </span>
  ))}

  {/* 요일 태그 */}
  {review.dayTags?.map((tag, idx) => (
    <span key={`day-${idx}`} className="bg-blue-300 px-3 py-1 rounded-full text-sm text-white">
      # {tag}
    </span>
  ))}

  {/* 시간 태그 */}
  {review.timeTags?.map((tag, idx) => (
    <span key={`time-${idx}`} className="bg-blue-300 px-3 py-1 rounded-full text-sm text-white">
      # {tag}
    </span>
  ))}
</div>

          <div className="flex items-center gap-4">
            {/* 좋아요 */}
            <div className="flex items-center gap-1 text-black cursor-pointer"
              onClick={() => handleLike(review.id)}>
              <img src={likedReviews[review.id] ? HeartFillIcon : HeartEmptyIcon} alt="heart" className="w-4 h-4" />
              <span>{review.likeCount}</span>
            </div>

            {/* 신고 */}
            <button
              type="button"
              className="text-gray-400 hover:text-red-500"
               onClick={() => handleReport(review)}
            >
              <img src={WarningIcon} alt="신고" className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}