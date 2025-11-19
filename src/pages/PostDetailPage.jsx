import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserIcon from "../assets/User-Thumb.svg";
import HeartEmptyIcon from "../assets/heart-empty.svg";
import WarningIcon from "../assets/warning-circled-outline.svg";

export default function PostDetailPage() {
  const { boardId, postId } = useParams();
  const token = localStorage.getItem("accessToken");

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);



  //본인 불러오기
  useEffect(() => {
  const fetchMe = async () => {
    const response = await fetch("http://localhost:8080/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    setCurrentUserId(data.id);     
  };

  fetchMe();
}, []);

  // 게시글 + 댓글 불러오기
  const fetchPostDetail = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/boards/${boardId}/post/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setPost(data);
      setComments(data.comments);
    } catch (err) {
      console.error("게시글 상세 조회 실패", err);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, [boardId, postId]);

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;

    try {
      const data = await fetch(
        `http://localhost:8080/boards/${boardId}/post/${postId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: commentInput,
            isAnonymous,
          }),
        }
      );

      const newComment = await data.json();

      // 댓글 리스트에 추가
      setComments((prev) => [...prev, newComment]);
      setCommentInput("");

    } catch (err) {
      console.error("댓글 작성 실패", err);
    }
  };

  if (!post) return <div className="p-6">로딩중...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* 작성자 정보 + 제목 */}
      <div className="mb-4 relative">
        <div className="flex items-center gap-2">
          <img src={UserIcon} alt="user" className="w-10 h-10" />
          <span className="font-semibold text-black">
            {post.isAnonymous ? "익명" : post.authorNickName}
          </span>
        </div>

         {/* 오른쪽 수정/삭제 버튼 */}
  {post.authorId === currentUserId && (
    <div className="absolute right-0 top-0 flex gap-2 text-sm">
      <button className="text-black" onClick={() => console.log("게시글 수정")}>
        수정
      </button>
      <button className="text-black" onClick={() => console.log("게시글 삭제")}>
        삭제
      </button>
    </div>
  )}






        <h2 className="text-xl font-bold mt-2 text-black">{post.title}</h2>

        <div className="text-sm text-gray-500 mt-1">
          {post.createdAt.replace("T", " ")}
        </div>
      </div>

      {/* 태그들 */}
      <div className="mb-4 text-sm text-black space-y-3">
        <div>출발 지역 : <span className="bg-blue-300 px-3 py-1 rounded-full text-sm text-white">
      # {post.departureTag}
    </span> </div>
        <div>도착 지역 : <span className="bg-blue-300 px-3 py-1 rounded-full text-sm text-white">
      # {post.arrivalTag}
    </span></div>
        <div>출발 시간 : <span className="bg-blue-300 px-3 py-1 rounded-full text-sm text-white">
      # {post.timeTag}
    </span></div>
      </div>

      {/* 본문 */}
      <div className="text-gray-800 mb-6 leading-relaxed">
        {post.content}
      </div>

      {/* 좋아요 / 신고 */}
      <div className="flex items-center gap-4 mb-6">

        <div className="flex items-center gap-1">
          <img src={HeartEmptyIcon} className="w-5 h-5" />
          <span>{post.likeCount}</span>
        </div>

        <button className="text-gray-400">
          <img src={WarningIcon} className="w-5 h-5" />
        </button>
      </div>

      {/* 댓글 리스트 */}
      <div className="space-y-4">
        {comments.map((c) => (
         <div key={c.id} className="relative">  
              {/* 댓글 오른쪽 수정/삭제 */}
    {c.authorId === currentUserId && (
      <div className="absolute right-0 top-0 flex gap-2 text-sm">
        <button className="text-black" onClick={() => console.log("댓글 수정", c.id)}>
          수정
        </button>
        <button className="text-black" onClick={() => console.log("댓글 삭제", c.id)}>
          삭제
        </button>
      </div>
    )}


            <div class="flex items-start gap-2.5">
                              <img src={UserIcon} alt="user" className="w-8 h-8" />
                    <div class="flex flex-col w-full max-w-[320px] leading-1.5">
        <div class="flex items-center space-x-1.5 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-heading">{c.isAnonymous ? "익명" : c.authorNickName}</span>
            <span class="text-sm text-body">{c.createdAt.replace("T", " ")}</span>
        </div>
        <p class="text-sm py-2.5 text-body">{c.content}</p>
    </div>
    
</div>

  <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-1 text-black ml-11">
            <img src={HeartEmptyIcon} className="w-4 h-4" />
            <span>{c.likeCount}</span>
          </div>

          <button className="text-gray-400">
            <img src={WarningIcon} className="w-5 h-5" />
          </button>
        </div>

        </div>
 

          
        ))}
      </div>

      {/* 댓글 입력창 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 flex items-center gap-2 border-t bg-blue-300 px-3 py-4 rounded-full">

          <div className="flex items-center mb-4 mt-2">
        <input
          id="anonymous"
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
        />
        <label htmlFor="anonymous" className="ml-2 text-sm font-medium text-gray-900 whitespace-nowrap">
          익명
        </label>
      </div>


        <textarea id="chat" rows="1" class="mx-4 bg-neutral-primary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 placeholder:text-body" value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)} placeholder="Your message..."></textarea>
            <button type="submit" onClick={handleCommentSubmit} class="inline-flex justify-center p-2 text-fg-brand rounded-full cursor-pointer hover:bg-brand-softer">
            <svg class="w-6 h-6 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/></svg>
            <span class="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
}
