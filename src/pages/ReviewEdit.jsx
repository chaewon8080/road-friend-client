import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageIcon from "../assets/image.svg";

export default function ReviewEdit() {
  const { communityId, reviewId } = useParams();
  const navigate = useNavigate();

  const [communityName, setCommunityName] = useState("");
  const [content, setContent] = useState("");
  const [dayTags, setDayTags] = useState([]);
  const [timeTags, setTimeTags] = useState([]);
  const [categoryTags, setCategoryTags] = useState([]);
  const [image, setImage] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const token = localStorage.getItem("accessToken");
          const API = import.meta.env.VITE_API_URL; 


  // 버스정류장 이름 & 기존 리뷰 불러오기
  useEffect(() => {
    const load = async () => {
      try {
        // 정류장 이름
        const resBusStop = await fetch(`${API}/bus-stops/name/${communityId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataBusStop = await resBusStop.json();
        setCommunityName(dataBusStop.name);

        // 기존 리뷰 조회
        const resReview = await fetch(`${API}/bus-stops/reviews/${reviewId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const review = await resReview.json();

        setContent(review.content);
        setDayTags(review.dayTags);
        setTimeTags(review.timeTags);
        setCategoryTags(review.categoryTags);
        setImage(review.imageUrl);
        setIsAnonymous(review.isAnonymous);

      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  // 태그 초기 데이터
  const days = ["월요일","화요일","수요일","목요일","금요일","토요일","일요일"];
   const times = [];
for (let i = 0; i < 24; i++) {

  if(i<10){
      times.push( "0" + i + ":00");

  }
  else{
  times.push( i + ":00");

  }

}
  const types = ["실시간 제보", "민원"];

  // 태그 토글
  const toggleTag = (tag, type) => {
    let tags, setTags;

    if (type === "day") {
      tags = dayTags;
      setTags = setDayTags;
    } else if (type === "time") {
      tags = timeTags;
      setTags = setTimeTags;
    } else {
      tags = categoryTags;
      setTags = setCategoryTags;
    }

    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  // 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      content,
      dayTags,
      timeTags,
      categoryTags,
      isAnonymous,
      imageUrl: image
    };

    const res = await fetch(`${API}/bus-stops/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(reviewData)
    });

    if (!res.ok) {
      alert("리뷰 수정 실패");
      return;
    }

    alert("리뷰 수정 완료!");
    navigate(`/community/${communityId}`);
  };

  const renderTagButtons = (list, type) => (
    <div className="flex flex-wrap gap-2 mb-2">
      {list.map((tag) => {
        const selected =
          (type === "day" && dayTags.includes(tag)) ||
          (type === "time" && timeTags.includes(tag)) ||
          (type === "type" && categoryTags.includes(tag));

        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag, type)}
            className={`font-medium rounded-full text-sm px-3 py-1 text-white ${
              selected ? "bg-blue-500" : "bg-blue-300 hover:bg-blue-400"
            }`}
          >
            # {tag}
          </button>
        );
      })}
    </div>
  );

  return (
    <form className="p-4 bg-gray-50 rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">{communityName} 리뷰 수정</h2>

      <label className="font-semibold">요일</label>
      {renderTagButtons(days, "day")}

      <label className="font-semibold">시간</label>
      {renderTagButtons(times, "time")}

      <label className="font-semibold">타입</label>
      {renderTagButtons(types, "type")}

      <div className="flex items-center mb-4 mt-2">
        <input
          id="anonymous"
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="anonymous" className="ml-2 text-sm">익명으로 작성</label>
      </div>

      {/* 이미지 */}
      <div className="mb-2">
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
        <label htmlFor="file-input" className="cursor-pointer">
          <img src={ImageIcon} alt="이미지 업로드" className="w-20 h-20" />
        </label>
      </div>

      <textarea
        rows="4"
        className="mb-2 w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="여기에 리뷰를 작성하세요."
      />

      <button
        type="submit"
        className="bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-full text-sm px-3 py-1"
      >
        수정 완료
      </button>
    </form>
  );
}
