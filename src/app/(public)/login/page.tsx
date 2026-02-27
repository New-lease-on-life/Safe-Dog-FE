"use client";
const oauth_url = `http://localhost:8080/oauth2/authorization`;
const tmp_url = `http://localhost:3000/oauth/callback?accessToken=bearer&refreshToken=bearer`;
export default function page() {
  const handleLogin = (provider: "google" | "naver" | "kakao") => {
    window.location.href = tmp_url;
    // window.location.href = `${oauth_url}/${provider}`;
  };
  return (
    <div className="flex flex-col">
      <button onClick={() => handleLogin("google")}> 구글 로그인</button>
      <button onClick={() => handleLogin("naver")}> 네이버 로그인</button>
      <button onClick={() => handleLogin("kakao")}> 카카오 로그인</button>
    </div>
  );
}
