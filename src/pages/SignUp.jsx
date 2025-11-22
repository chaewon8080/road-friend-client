import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); 
  const [nickname, setNickname] = useState("");

            const API = import.meta.env.VITE_API_URL; 


  const handleSubmit = async (e) => {
    // 페이지 새로고침 방지
    e.preventDefault(); 

    //서버로 요청 보내지 않고 입력 오류를 먼저 체크
     if (password !== confirmPassword) {
      alert("비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    //서버로 보낼 json 데이터 생성
    const sendData = { email, password, nickname };

    try {
        //fetch를 사용해서 서버로 http 요청 전송
      const response = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

       


const data = await response.json(); // 먼저 JSON 파싱

if (!response.ok) {
  alert(data.message); // 실패 메시지
} else {
  alert(data.message); // 성공 메시지
  navigate("/");       // 홈 이동
}

    } catch (err) {
      console.error(err);
      alert("가입 실패");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">회원 가입</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
     
          {/* https://flowbite.com/docs/forms/input-field/ 여기서 가져옴 모든 입력, submit */}
           <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
        <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required 
         value={email}
              onChange={(e) => setEmail(e.target.value)}
        
        />
    </div>

          <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호</label>
        <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required

              value={password}
              onChange={(e) => setPassword(e.target.value)}
        
        />
    </div> 

          {/* 비밀번호 확인 */}
           <div class="mb-6">
        <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">비밀번호 확인</label>
        <input type="password" id="confirm_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required 
        value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
        />
    </div> 

          <div>
            <label for="nickname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">닉네임</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nickname" 
            value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            required />
        </div>

          <div className="space-y-2 mt-4">
            <button
              type="button"
              className="flex items-center justify-center w-full bg-blue-500 text-white rounded-md py-2 font-bold hover:bg-blue-600"
            >
              <span className="mr-2 font-bold text-lg">G</span> 구글 로그인
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-full rounded-md py-2 bg-green-500 font-bold text-white hover:bg-green-600"
            >
              <span className="mr-2 font-bold text-lg">N</span> 네이버 로그인
            </button>
          </div>

              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </div>
  );
}
