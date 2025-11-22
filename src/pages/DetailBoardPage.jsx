import { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import HeartEmptyIcon from "../assets/heart-empty.svg";
import CommentIcon from "../assets/comment.svg";




export default function DetailBoardPage() {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [posts, setPosts] = useState([]);
  const [sort,setSort] = useState("latest");

    const navigate = useNavigate();


  const [category, setCategory] = useState("");
  const [departureTag, setDepartureTag] = useState("");
  const [arrivalTag, setArrivalTag] = useState("");
  const [timeTag, setTimeTag] = useState("");
  const [keyword, setKeyword] = useState("");

    const token = localStorage.getItem("accessToken"); // JWT 토큰

        const API = import.meta.env.VITE_API_URL; 



  // 게시글 fetch 함수
  const fetchPosts = async () => {
  try {
    const params = new URLSearchParams();

    if (category && (category!="전체")) params.append("category", category);
    if (departureTag) params.append("departure", departureTag);
    if (arrivalTag) params.append("arrival", arrivalTag);
    if (timeTag) params.append("time", timeTag);
    if (keyword) params.append("keyword", keyword);
    params.append("sort", sort);

    const res = await fetch(
      `${API}/boards/${boardId}?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
    setBoard(data);
    setPosts(data.posts);

  } catch (err) {
    console.error("게시글 조회 실패", err);
  }
};

    // 기본 초기 로딩
  useEffect(() => {
    fetchPosts();
  }, []);

  // 자동 검색되는 조건: category, sort
  useEffect(() => {
    fetchPosts();
  }, [category, sort]);

  // Enter 눌렀을 때 검색 실행
  const handleEnter = (e) => {
    if (e.key === "Enter") fetchPosts();
  };


  if (!board) return <div className="p-6">로딩중...</div>;


  return (
    <div className="p-6">

      {/* 제목 */}
      <h1 className="text-xl font-semibold mb-4">
        {board.departure} → {board.arrival} 게시판
      </h1>

      {/* 상단 메뉴 */}
      <div className="flex flex-col mb-4">
        <div>
          <span className="text-black">글 {posts.length}개 </span>
          <button
            type="button"
            className="text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-full text-sm px-3 py-1 mb-2"
            onClick={() => navigate(`/board/${boardId}/write-post`)}
          >
            글쓰기
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="text-black" onClick={() => {
              setSort("likes");
                   }} >좋아요순</button>
          <button className="text-black" onClick={() => {
              setSort("latest");
              
            }}>최신순</button>
        </div>
      </div>

      {/* 카테고리 탭 일단 UI만 구현해놈 */}
      <div className="flex gap-3 mb-3 text-sm">
        {["질문", "꿀팁 공유", "자유","전체"].map(c => (
          <button
            type="button"
            key={c}
            className={`text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-full text-sm px-3 py-1 mb-2
                  ${category === c ? "bg-blue-500 text-white" : "bg-blue-300 text-white"}`

            }
            onClick={() => { setCategory(c); }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 태그 검색 UI 만 구현 */}
      <div className="space-y-2 mb-4">

        <div className="flex items-center gap-2">
          <label className="text-sm w-20">출발 지역</label>
          {/* 검색창 예시 */}
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" placeholder="태그 검색"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={departureTag}
           onChange={(e) => setDepartureTag(e.target.value)

            
           } 
           onKeyDown={handleEnter}
    
          required />
        <button type="submit"    onClick={() =>fetchPosts() }
 class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
    </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm w-20">도착 지역</label>
            {/* 검색창 예시 */}
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" placeholder="태그 검색"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={arrivalTag}
          onChange={(e) => setArrivalTag(e.target.value)}
          onKeyDown={handleEnter}
    
          required />
        <button type="submit"   onClick={() => setArrivalTag(arrivalTag)}
  class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
    </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm w-20">출발 시간</label>
             {/* 검색창 예시 */}
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" placeholder="태그 검색"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={timeTag}
                   onChange={(e) => setTimeTag(e.target.value)}
                    onKeyDown={handleEnter}
    
          required />
        <button type="submit"   onClick={() =>  fetchPosts()}
  class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
    </div>
        </div>

      </div>

      {/* 검색창 UI */}
      <div class="relative w-full mb-4">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" placeholder="키워드 검색"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={keyword}
          onKeyDown={handleEnter}
          onChange={(e) => setKeyword(e.target.value)}
          
                      
    
          required />
        <button type="submit"   onClick={() => fetchPosts()}
 class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
    </div>

      {/* 게시글 목록 (필터링 없음) */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white border p-4 rounded shadow"
                   onClick={() => navigate(`/board/${boardId}/post/${post.id}`)}  

          >
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-3">{post.content}</p>

            <div className="flex gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1 text-black cursor-pointer">
                            <img src={HeartEmptyIcon} alt="heart" className="w-4 h-4" />
                            <span>{post.likeCount}</span>
                          </div>




               <div className="flex items-center gap-1 text-black cursor-pointer">
                            <img src={CommentIcon} alt="comment" className="w-4 h-4" />
                            <span>{post.commentCount}</span>
                          </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}