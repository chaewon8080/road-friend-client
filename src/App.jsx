import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Review from "./pages/Review";
import Board from "./pages/Board";
import Insight from "./pages/Insight";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import CommunityPage from "./pages/CommunityPage";
import ReviewWrite from "./pages/ReviewWrite";
import DetailBoardPage from "./pages/DetailBoardPage";
import PostWrite from "./pages/PostWrite";
import ReviewEdit from "./pages/ReviewEdit";
import PostDetailPage from "./pages/PostDetailPage";
import PostEdit from "./pages/PostEdit";
import ReportDetailPage from "./pages/ReportDetailPage";
import OAuthRedirectPage from "./pages/OAuthRedirectPage";
import MyReviewPage from "./pages/MyReviewPage";
import { loadNaverMap } from "./naver-map-loader";
import { useEffect, useState } from "react";
import MyLikeReviewPage from "./pages/MyLikeReviewPage";
import MyPostPage from "./pages/MyPostPage";
import MyLikePostPage from "./pages/MyLikePostPage";
import MyCommentPostPage from "./pages/MyCommentPostPage";
import GptChatPage from "./pages/GptChatPage";


export default function App() {

    useEffect(() => {
    loadNaverMap(() => {
      console.log("네이버 지도 SDK 로드 완료");
    });
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="pt-28"> {/* 네비게이션바 높이만큼 여백 */}
        <Routes>
          {/* url에 따라 어떤 컴포넌트를 렌더링할지 정의 */}
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/board" element={<Board />} />
          <Route path="/insight" element={<Insight />} />
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
           <Route path="/mypage" element={<MyPage></MyPage>}></Route>
           <Route path="/community/:communityId" element={<CommunityPage />} />
           <Route path="/community/:communityId/write-review" element={<ReviewWrite />} />
           <Route path="/board/:boardId" element={<DetailBoardPage></DetailBoardPage>}></Route>
            <Route path="/board/:boardId/write-post" element={<PostWrite/>} />
            <Route path="/community/:communityId/edit-review/:reviewId" element={<ReviewEdit />} />
            <Route path="/board/:boardId/post/:postId" element={<PostDetailPage />} />
            <Route path="/boards/:boardId/edit-post/:postId" element={<PostEdit />}/>
            <Route path="/reports"element={<ReportDetailPage></ReportDetailPage>}> </Route>
            <Route path="/oauth/redirect" element={<OAuthRedirectPage />} />
            <Route path="/mypage/myreview" element={<MyReviewPage />} />
            <Route path="/mypage/mylikereview" element={<MyLikeReviewPage/>}></Route>
            <Route path="/mypage/mypost" element={<MyPostPage></MyPostPage>}></Route>
            <Route path="/mypage/mylikepost" element={<MyLikePostPage></MyLikePostPage>}></Route>
            <Route path="/mypage/mycommentpost" element={<MyCommentPostPage></MyCommentPostPage>}></Route>
            <Route path="/gpt" element={<GptChatPage></GptChatPage>}></Route>









        </Routes>
      </div>
    </Router>
  );
}

