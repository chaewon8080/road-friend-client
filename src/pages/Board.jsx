import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Board() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken"); // JWT 토큰

  useEffect(() => {
  const getBoardList = async () => {
    try {
      
      const resBoardList = await fetch(`http://localhost:8080/boards`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await resBoardList.json();
      setBoards(data);
    
    } catch (err) {
      console.error(err);
    }
  };

  getBoardList();
}, []);


  return (
    <div className="p-6">
      {boards.map(board => (
        
        <div 
                  key={board.id}
        class="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs hover:bg-gray-100"
                  onClick={() => navigate(`/board/${board.id}`)}
        
        >
    <h3 class="mb-3 text-xl font-semibold tracking-tight text-heading leading-8">{board.departure} → {board.arrival} 게시판</h3>
</div>







      ))}
    </div>
  );
}