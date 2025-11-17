import { useState } from "react";
import NaverMap from "./NaverMap";
import { useNavigate } from "react-router-dom";
import BusStopIcon from "../assets/bus-stop.svg";


export default function BusStopPage() {
  const [location, setLocation] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [searchKeyword,setSearchKeyword] = useState("");

  const navigate = useNavigate();

  const handleLocation = async (coords) => {

   // localStorage.clear();

   //로컬스토리지에 저장된 토큰 꺼내오기
    const token = localStorage.getItem("accessToken");
     if (!token) { 
      alert("로그인 하셔야 이용할 수 있습니다.");
          navigate("/login"); // 로그인 페이지로 이동 
           return; 

    }
      
    setLocation(coords);

    //API 호출
      const res = await fetch(
        `http://localhost:8080/bus-stops/nearby?lat=${coords.lat}&lng=${coords.lng}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      //버스정류장 데이터
      const busStopData = await res.json();
      setBusStops(busStopData);
    
  };

    // 검색 -> 이름 포함 정류장
  const handleSearch = async () => {
    if (!searchKeyword.trim()) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 하셔야 이용할 수 있습니다.");
      navigate("/login");
      return;
    }

    
      const res = await fetch(
        `http://localhost:8080/bus-stops/search?keyword=${encodeURIComponent(searchKeyword)}`,
        {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        }
      );
      const busStopdata = await res.json();
      setBusStops(busStopdata); 
     
  };

    


  return (

    <>
      {/* 지도 영역 */}
      <div className="w-full h-[60vh]">
        <NaverMap 
          onSelectLocation={handleLocation} 
          busStops={busStops} 
        />
      </div>

      {/* 검색창 */}
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" placeholder="버스정류장 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        <button type="submit" onClick={handleSearch} class="text-white absolute end-2.5 bottom-2.5 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-400 dark:hover:bg-blue-400 dark:focus:ring-blue-800">Search</button>
    </div>

      {/* 정류장 리스트 */}
      <div className="w-full h-[40vh] overflow-y-auto p-2">
        <h2 className="font-semibold mb-2">근처 정류장</h2>
        
        {busStops.length === 0 ? (
          <p>지도에서 위치를 선택해주세요.</p>
        ) : (
          <ul>
            {busStops.map((stop) => (
              <li 
                key={stop.id} 
                className="py-2 border-b cursor-pointer hover:bg-gray-100 flex items-center"
                onClick={() => navigate(`/community/${stop.id}`)} // 이동
              >
                    <img src={BusStopIcon} alt="버스아이콘" className="w-10 h-10" />
                 <div>
                  <div className="font-semibold">{stop.name}</div>
                  <div className="text-xs text-gray-500">
                    주소: {stop.address} 거리: ({stop.distance.toFixed(2)} km)
                    정류장번호: {stop.number} 모바일번호: {stop.mobileNumber} 
                    리뷰개수 : {stop.reviewCount}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

}