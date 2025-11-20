import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ImageIcon from "../assets/image.svg";

export default function PostEdit() {

    const { boardId, postId } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);

  const [category, setCategory] = useState("");
  const [departureTag, setDepartureTag] = useState("");
  const [arrivalTag, setArrivalTag] = useState("");
  const [timeTag, setTimeTag] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);

  const token = localStorage.getItem("accessToken");

   // 기존 게시글 정보 불러오기
  useEffect(() => {
    const load = async () => {
      try {
        // 게시판 정보
        const resBoard = await fetch(`http://localhost:8080/boards/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const boardData = await resBoard.json();
        setBoard(boardData);

        // 기존 게시글 정보
        const resPost = await fetch(
          `http://localhost:8080/boards/${boardId}/post/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const post = await resPost.json();

        // 기존 데이터 넣기
        setCategory(post.category);
        setDepartureTag(post.departureTag);
        setArrivalTag(post.arrivalTag);
        setTimeTag(post.timeTag);
        setTitle(post.title);
        setContent(post.content);
        setImage(post.imageUrl);
        setIsAnonymous(post.isAnonymous);

      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [boardId, postId]);

    if (!board) return <div className="p-6">로딩 중...</div>;

      const handleSubmit = async (e) => {

     e.preventDefault(); 

    const postData = {
      title,
      content,
      category,
      departureTag,
      arrivalTag,
      timeTag,
      imageUrl: null,  // 지금은 이미지 업로드 구현 안함 null
      isAnonymous
    };

    //
    const res = await fetch(`http://localhost:8080/boards/${boardId}/post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) throw new Error("수정 실패");
          navigate(-1); // 상세 페이지로 이동
    
  };

  return (
      <form className="p-4 bg-gray-50 rounded-lg" onSubmit={handleSubmit}>
  
        {/* 제목 */}
        <h1 className="text-xl font-semibold mb-4">
          {board.departure} → {board.arrival} 게시판
        </h1>
  
        {/* 글 종류 선택 */}
        <p className="text-sm text-black mb-2">글 종류 선택</p>
        <div className="flex gap-3 mb-3 text-sm">
          {["질문", "꿀팁 공유", "자유", "전체"].map(c => (
            <button
              type="button"
              key={c}
              className={`text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-full text-sm px-3 py-1 mb-2
                    ${category === c ? "bg-blue-500 text-white" : "bg-blue-300 text-white"}`
  
              }
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
  
        {/* 태그 입력 */}
        <div className="space-y-3 mb-6">
  
                  <div className="flex items-center gap-2">
          {/* 출발 지역 */}
           <label className="text-sm w-20">출발 지역</label>
            {/* 입력창 */}
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input type="search" id="default-search" placeholder="태그 입력"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={departureTag}
              onChange={e => setDepartureTag(e.target.value)}
      
            required />
          <button type="submit"  class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
      </div>
      </div>
  
          {/* 도착 지역 */}
          <div className="flex items-center gap-2">
             <label className="text-sm w-20">도착 지역</label>
            {/* 입력창 */}
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input type="search" id="default-search" placeholder="태그 입력"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={arrivalTag}
                        onChange={e => setArrivalTag(e.target.value)}
      
            required />
          <button type="submit"  class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
      </div>
          </div>
  
          {/* 출발 시간 */}
          <div className="flex items-center gap-2">
             <label className="text-sm w-20">출발 시간</label>
            {/* 입력창 */}
        <div class="relative w-full">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input type="search" id="default-search" placeholder="태그 입력"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            value={timeTag}
                        onChange={e => setTimeTag(e.target.value)}
      
            required />
          <button type="submit"  class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
      </div>
        </div>
  </div>
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
  
  
  
        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
  
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
  
        {/* 본문 입력 */}
        <textarea id="message" rows="4" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" 
         placeholder="여기에 글을 작성하세요."
          className="mb-2 w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}>
  
        </textarea>
  
        {/* 등록 버튼 */}
         <button
          type="submit"
          className="bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-full text-sm px-3 py-1"
        >
          수정
        </button>
      </form>
    );








}