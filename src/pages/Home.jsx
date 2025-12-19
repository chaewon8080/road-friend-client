

export default function Home() {
  return (
    <div className="pt-24 px-8">
      {/* 메인 이미지 섹션 */}
      <section className="grid grid-cols-3 gap-4 mb-12">
        {/* 메인 배너 */}
        <div className="col-span-3 relative overflow-hidden rounded-2xl">
          {/* 배경 이미지 */}
          <img
            src="/mainimage.png"
            alt="길친구 메인 배너"
            className="w-full h-full object-cover"
          />

          {/* 가독성 오버레이 */}
          <div className="absolute inset-0 bg-white/55" />

          {/* 텍스트 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="font-myfont text-blue-300 text-4xl md:text-5xl font-bold">
              길친구
            </h1>
            <p className="mt-3 text-gray-800 text-base md:text-lg font-semibold">
              사람들의 경험으로 길을 찾습니다
            </p>
          </div>
        </div>
      </section>

      {/* 이용 가이드 섹션 */}
      <h2 className="text-xl font-semibold mb-4">이용 가이드</h2>
      <section className="grid grid-cols-3 gap-6">
       
      </section>


       {/* 출처 표기 */}
      <p className="text-xs text-gray-400 mt-12">
        UI Icons Image:
        Adapted from "Wireframes Kit - Free wireframing Websites and SaaS UI/UX" by Bogdan Hutuleac  
Licensed under CC BY 4.0  
Source: https://www.figma.com/community/file/1221009141145444839/wireframes-kit-free-wireframingwebsites-and-saas-ui-ux  
Components were customized.
홈 화면에 메인 이미지, 길친구 서비스 로고는 AI를 활용하여 생성되었습니다.

      </p>




    </div>
  );
}
