import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReportDetailPage() {
  const token = localStorage.getItem("accessToken");

  const [reports, setReports] = useState([]);  
  const [detailMap, setDetailMap] = useState({}); // 신고 대상 상세정보 저장


        const API = import.meta.env.VITE_API_URL; 

  // 전체 신고 목록 불러오기
  const fetchReports = async () => {
    const res = await fetch(`${API}/reports`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    setReports(data);

    // 각 신고에 맞는 상세 정보 동시에 불러오기
    data.forEach((report) => loadDetail(report));
  };

  // 신고 대상 상세 데이터 불러오기
  const loadDetail = async (report) => {
    let url = "";

    if (report.type === "POST") {
      url = `${API}/reports/${report.id}/posts/${report.targetId}`;
    } else if (report.type === "COMMENT") {
      url = `${API}/reports/${report.id}/comments/${report.targetId}`;
    } else if (report.type === "REVIEW") {
      url = `${API}/reports/${report.id}/reviews/${report.targetId}`;
    }

    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    const detail = await res.json();

    setDetailMap((prev) => ({
      ...prev,
      [report.id]: detail
    }));
  };

  // 승인 처리
  const approve = async (reportId) => {
    await fetch(`${API}/reports/${reportId}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchReports();
  };

  // 거부 처리
  const reject = async (reportId) => {
    await fetch(`${API}/reports/${reportId}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchReports();
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-6 text-black">

      <h2 className="text-2xl font-bold mb-6">신고 관리 페이지</h2>

      {reports.map((r) => {
        const detail = detailMap[r.id];

        return (
          <div key={r.id} className="border p-4 rounded-lg bg-white shadow mb-6">

            <p><strong>신고자:</strong> {r.reporterEmail}</p>
            <p><strong>사유:</strong> {r.reason}</p>
            <p><strong>신고 타입:</strong> {r.type}</p>

            <div className="mt-4 p-3 bg-gray-50 rounded">
              <h4 className="font-bold">신고된 내용</h4>

              {!detail && <p className="text-gray-400">불러오는 중...</p>}

              {detail && r.type === "POST" && (
                <>
                  <p><strong>제목:</strong> {detail.title}</p>
                  <p><strong>작성자:</strong> {detail.authorNickName}</p>
                  <p><strong>카테고리:</strong> {detail.category}</p>
                  <p><strong>출발태그:</strong>{detail.departureTag}</p>
                  <p><strong>도착태그:</strong>{detail.arrivalTag}</p>
                  <p><strong>출발시간태그:</strong>{detail.timeTag}</p>


 

                
                  <p className="mt-2">{detail.content}</p>
                 





                </>
              )}

              {detail && r.type === "COMMENT" && (
                <>
                  <p><strong>작성자:</strong> {detail.authorNickName}</p>
                  <p className="mt-2">{detail.content}</p>
                </>
              )}

              {detail && r.type === "REVIEW" && (
                <>
                  <p><strong>작성자:</strong> {detail.authorNickName}</p>
                  <p><strong>정류장:</strong> {detail.busStopName}</p>
                  <p className="mt-2">{detail.content}</p>
                  {detail.imageUrl && (
                    <img
                      src={detail.imageUrl}
                      alt="review"
                      className="w-40 mt-3 rounded"
                    />
                  )}
                </>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => approve(r.id)}
                className="text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-full text-sm px-3 py-1 mb-2"              >
                승인
              </button>

              <button
                onClick={() => reject(r.id)}
                className="text-white bg-blue-300 hover:bg-blue-400 font-medium rounded-full text-sm px-3 py-1 mb-2"
              >
                거부
              </button>
            </div>

          </div>
        );
      })}

    </div>
  );
}
