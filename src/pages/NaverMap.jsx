import { useEffect, useRef, useState } from "react";
import BusStopIcon from "../assets/bus-stop.svg";
import CurrentLocationIcon from "../assets/current-location.svg";
import LocationIcon from "../assets/location.svg";
import { useParams,useNavigate } from "react-router-dom";
import { loadNaverMap } from "../naver-map-loader";



export default function NaverMap({onSelectLocation , busStops}) {
    const navigate = useNavigate();

    const infoWindowRef = useRef(null); 

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);   // map 인스턴스 보관
  const markerRef = useRef(null);        // 유저가 클릭했을 때 마커
 
  const busStopMarkersRef = useRef([]); //버스정류장 마커 
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    loadNaverMap();
  }, []);

  useEffect(() => {
    // map을 한 번만 생성
    const newMap = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37, 126.876),
      zoom: 10,
    });


    //만든 map 객체를 ref에 보관
    mapInstanceRef.current = newMap;
    setMapReady(true);

  
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;

    const handleClick = (e) => {
      const lat = e.coord.y;
      const lng = e.coord.x;

      // 기존 마커가 있으면 지도에서 제거
      if (markerRef.current) {
        //네이버 지도 api 함수, 마커를 제거함
        markerRef.current.setMap(null);
        //참조된 거 제거
        markerRef.current = null;
      }

      // 새 마커 생성, ref에 저장
      const newMarker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(lat, lng),
        map,
        icon: {
    url: CurrentLocationIcon, 
    size: new window.naver.maps.Size(40, 40),
    scaledSize: new window.naver.maps.Size(20, 20), 
  },
      });

      //네이버 지도 api의 marker를 가리킴
      markerRef.current = newMarker;

      console.log("선택 위치:", lat, lng);

        onSelectLocation({ lat, lng });

      
    };

    // 유저가 map을 클릭하면 handleClick함수를 실행하기 
    window.naver.maps.Event.addListener(map, "click", handleClick);

    
  }, [mapReady]); // mapReady가 true가 되면 한 번 등록

  //  서버에서 받은 버스정류장 마커 표시
  useEffect(() => {
    if (!mapReady) return;


    // 이전 정류장 마커 제거
    busStopMarkersRef.current.forEach(marker => marker.setMap(null));
    busStopMarkersRef.current = [];

    busStops.forEach((stop) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(stop.latitude, stop.longitude),
        map: mapInstanceRef.current,
        title: stop.name,
         icon: {
    url: LocationIcon, 
    size: new window.naver.maps.Size(40, 40),
    scaledSize: new window.naver.maps.Size(30, 30), 
  },
      });

      const infoWindow = new window.naver.maps.InfoWindow({
  content: `
    <div class="p-2">
      <div class="flex items-center cursor-pointer hover:bg-gray-100" id="bus-stop-${stop.id}">
        <img src="${BusStopIcon}" alt="버스아이콘" style="width:40px; height:40px; margin-right:8px;" />
        <div>
          <div class="font-semibold">${stop.name}</div>
          <div class="text-xs text-gray-500">
            주소: ${stop.address}<br/>
            거리: ${stop.distance.toFixed(2)} km<br/>
            정류장번호: ${stop.number}<br/>
            모바일번호: ${stop.mobileNumber}<br/>
            리뷰개수 : ${stop.reviewCount}

          </div>
        </div>
      </div>
    </div>
  `
});
      window.naver.maps.Event.addListener(marker, "click", () => {

          // 기존 InfoWindow가 열려있으면 닫기
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

        infoWindow.open(mapInstanceRef.current, marker);
            infoWindowRef.current = infoWindow; // 현재 InfoWindow 업데이트


         // InfoWindow 열리고 DOM이 생긴 뒤에 이벤트 연결
  setTimeout(() => { // DOM이 생성될 때까지 약간 지연 (0ms)
    const element = document.getElementById(`bus-stop-${stop.id}`);
    if (element) {
      element.addEventListener("click", () => navigate(`/community/${stop.id}`));
    }
  }, 0); 
      });


      busStopMarkersRef.current.push(marker);
    });
  }, [busStops, mapReady]);

  return <div ref={mapRef} style={{ width: "100%", height: "60vh" }} />;
}
