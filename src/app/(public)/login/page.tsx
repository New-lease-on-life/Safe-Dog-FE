"use client";
export default function page() {
  const handleLogin = async (provider: "google" | "naver" | "kakao") => {
    console.log(response);
  };

  return (
    <div className="flex flex-col">
      <button onClick={() => handleLogin("google")}> 구글 로그인</button>
      <button onClick={() => handleLogin("naver")}> 네이버 로그인</button>
      <button onClick={() => handleLogin("kakao")}> 카카오 로그인</button>
    </div>
  );
}
