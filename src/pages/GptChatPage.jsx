import { useEffect, useRef, useState } from "react";

export default function GptChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "안녕하세요! 길친구 GPT입니다 😊" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("accessToken");

  // 스크롤 자동 내려가기
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
const sendMessage = async () => {
  if (!input.trim() || loading) return;

  const userMessage = input;
  setInput("");
  setLoading(true);

  const newMessages = [
    ...messages,
    { role: "user", content: userMessage }
  ];

  setMessages(newMessages);

  try {
    const res = await fetch(`${API}/gpt/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        messages: newMessages   
      })
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      { role: "assistant", content: data.answer }
    ]);

  } catch (e) {
    setMessages(prev => [
      ...prev,
      { role: "assistant", content: "⚠️ 오류가 발생했어요." }
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="pt-24 px-8 max-w-3xl mx-auto h-[calc(100vh-96px)] flex flex-col">

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] whitespace-pre-wrap
              ${
                msg.role === "user"
                  ? "bg-blue-300 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 입력 영역 */}
      <div className="border-t pt-4 flex gap-2">
        <input
          className="flex-1 border rounded-xl px-4 py-2 focus:outline-none"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          className="bg-blue-300 text-white px-6 rounded-xl font-bold hover:bg-blue-400 disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          전송
        </button>
      </div>
    </div>
  );
}
