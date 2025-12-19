import { useEffect, useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import HeartEmptyIcon from "../assets/heart-empty.svg";
import CommentIcon from "../assets/comment.svg";




export default function MyCommentPostPage() {
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
    

    const res = await fetch(
      `${API}/boards/mycommentposts`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();
   
    setPosts(data);

  } catch (err) {
    console.error("게시글 조회 실패", err);
  }
};

    // 기본 초기 로딩
  useEffect(() => {
    fetchPosts();
  }, []);

 

  



  return (
    <div className="p-6">



      {/* 게시글 목록 (필터링 없음) */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white border p-4 rounded shadow"
                   onClick={() => navigate(`/board/${post.boardId}/post/${post.id}`)}  

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