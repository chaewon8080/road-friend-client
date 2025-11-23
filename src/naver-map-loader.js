export function loadNaverMap() {
  const script = document.createElement("script");
  const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

  script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`;
  document.head.appendChild(script);
}