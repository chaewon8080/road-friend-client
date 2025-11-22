import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageIcon from "../assets/image.svg";

export default function ReviewWrite() {
  const { communityId } = useParams();
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


// 버스정류장 이름 가져오기
useEffect(() => {
  const fetchBusStopName = async () => {
    try {
      const res = await fetch(`${API}/bus-stops/name/${communityId}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      setCommunityName(data.name); // 객체에서 name만 꺼내서 state에 저장
    } catch (err) {
      console.error(err);
    }
  };

  fetchBusStopName();
}, [communityId, token]);

  // 태그 목록
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

  // 태그 토글 함수
  const toggleTag = (tag, type) => {
  let tags, setTags;

  // 어떤 태그 배열을 수정할지 결정
  if (type === "day") {
    tags = dayTags;
    setTags = setDayTags;
  } else if (type === "time") {
    tags = timeTags;
    setTags = setTimeTags;
  } else if (type === "type") {
    tags = categoryTags;
    setTags = setCategoryTags;
  }

  //클릭한 태그가 이미 포함되어 있으면 제거, 아니면 추가
  if (tags.includes(tag)) {
    setTags(tags.filter(t => t !== tag)); //이미 선택 -> 제거
  } else {
    setTags([...tags, tag]); //없으면 추가
  }
};

  // 리뷰 등록
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content) {
      alert("리뷰 내용을 입력해주세요");
      return;
    }

    // 서버에 보낼 JSON
    const reviewData = {
      content,
      dayTags,
      timeTags,
      categoryTags,
      isAnonymous,
      imageUrl: null, // 나중에 이미지 업로드 붙일 경우 처리 
    };

      const res = await fetch(`${API}/bus-stops/${communityId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) throw new Error("리뷰 등록 실패");
      navigate(-1);
    
  };

  // 태그 버튼 렌더링
  const renderTagButtons = (tagArray, type) => (
    <div className="flex flex-wrap gap-2 mb-2">
      {tagArray.map(tag => {
        let selected = false;

if (type === "day") {
  selected = dayTags.includes(tag);
} else if (type === "time") {
  selected = timeTags.includes(tag);
} else {
  selected = categoryTags.includes(tag);
}

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
      <h2 className="text-xl font-bold mb-4">{communityName} 리뷰 작성</h2>

      <label className="font-semibold">요일</label>
      {renderTagButtons(days, "day")}

      <label className="font-semibold">시간</label>
      {renderTagButtons(times, "time")}

      <label className="font-semibold">타입</label>
      {renderTagButtons(types, "type")}

      {/* 익명 체크 */}
      <div className="flex items-center mb-4 mt-2">
        <input
          id="anonymous"
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
        />
        <label htmlFor="anonymous" className="ml-2 text-sm font-medium text-gray-900">
          익명으로 작성
        </label>
      </div>

      {/* 이미지 업로드 */}
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

      {/* 리뷰 내용 */}
      <textarea id="message" rows="4" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" 
       placeholder="여기에 리뷰를 작성하세요."
        className="mb-2 w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}>

      </textarea>


      <button
        type="submit"
        className="bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-full text-sm px-3 py-1"
      >
        등록
      </button>
    </form>
  );
}