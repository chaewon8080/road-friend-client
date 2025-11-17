import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BusStopIcon from "../assets/bus-stop.svg";
import UserIcon from "../assets/User-Thumb.svg";
import HeartEmptyIcon from "../assets/heart-empty.svg";
import HeartFillIcon from "../assets/heart-fill.svg";
import WarningIcon from "../assets/warning-circled-outline.svg";

export default function CommunityPage() {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [likedReviews, setLikedReviews] = useState({}); // 리뷰별 좋아요 상태, 객체로 관리
  const [busStopName, setBusStopName] = useState("");
const [reviewsData, setReviewsData] = useState([]);


  const token = localStorage.getItem("accessToken"); // JWT 토큰

  useEffect(() => {
  const getBusStopName = async () => {
    try {
      // 버스정류장 정보 호출
      const resBusStop = await fetch(`http://localhost:8080/bus-stops/name/${communityId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await resBusStop.json();
      const busStopName = data.name;
            setBusStopName(busStopName);


      // 해당 버스정류장 리뷰 호출
      const resReviews = await fetch(`http://localhost:8080/bus-stops/${communityId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const reviewsData = await resReviews.json();
      setReviewsData(reviewsData);

    
    } catch (err) {
      console.error(err);
    }
  };

  getBusStopName();
}, [communityId]);

 const handleLike = (reviewId) => {
  // 이전 상태 복사
  const newLikedReviews = { ...likedReviews };

  // 클릭한 리뷰 상태 반전
  if (newLikedReviews[reviewId]) {
    newLikedReviews[reviewId] = false; // 이미 좋아요였으면 취소
  } else {
    newLikedReviews[reviewId] = true;  // 아니면 좋아요
  }

  // 상태 업데이트
  setLikedReviews(newLikedReviews);
};


  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="flex items-center mb-4">
        <img src={BusStopIcon} alt="icon" className="w-5 h-5" />
        <h2 className="text-xl font-bold pl-3">{busStopName}</h2>
      </div>

      {/* 상단 메뉴 */}
      <div className="flex flex-col mb-4">
        <div>
          <span className="text-black">리뷰 {reviewsData.length}개 </span>
          <button
            type="button"
            className="text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-full text-sm px-3 py-1 mb-2"
            onClick={() => navigate(`/community/${communityId}/write-review`)}
          >
            리뷰쓰기
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="text-black">좋아요순</button>
          <button className="text-black">최신순</button>
        </div>
      </div>

      {/* 검색창 예시 */}
      <div class="relative mb-4">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" placeholder="키워드 검색"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        <button type="submit"  class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
    </div>

       <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" placeholder="태그 검색"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        <button type="submit"  class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
    </div>

      {/* 리뷰 목록 */}
      {reviewsData.map(review => (
        <div key={review.id} className="bg-white rounded-xl mb-4 shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src={UserIcon} alt="icon" className="w-10 h-10" />
              <div className="text-black">{review.isAnonymous ? "익명" : `${review.authorNickName}`}</div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="text-sm text-black">수정</button>
              <button type="button" className="text-sm text-black">삭제</button>
            </div>
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
            >
              <img src={WarningIcon} alt="신고" className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}