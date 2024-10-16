'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './signin.module.scss';

const cx = classNames.bind(styles);

// const KAKAO_TOKEN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleLogin = () => {
    window.location.href =
      'http://13.209.88.22:8080/oauth2/authorization/kakao'; // Spring Boot 서버의 카카오 로그인 URI
  };

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <Image
              src="/svgs/login-center1.svg"
              alt=""
              width={310}
              height={502}
              className={cx('image-container')}
            />
            <p className={cx('introduce-text')}>
              소중한 <b>가족 여행 기록</b>을
              <br /> 저장해보세요!
            </p>
          </>
        );
      case 2:
        return (
          <>
            <Image
              src="/svgs/login-center2.svg"
              alt=""
              width={310}
              height={502}
              className={cx('image-container')}
            />
            <p className={cx('introduce-text')}>
              특별한 가족 여행을 위한
              <br />
              <b>여정</b>을 준비해보세요!
            </p>
          </>
        );
      case 3:
        return (
          <>
            <Image
              src="/svgs/login-center3.svg"
              alt=""
              width={310}
              height={502}
              className={cx('image-container')}
            />
            <p className={cx('introduce-text')}>
              다른 가족과 <b>여행 추억</b>을
              <br /> <b>공유</b>할 수 있어요!
            </p>
          </>
        );
      case 4:
        return (
          <>
            <Image
              src="/svgs/login-center4.svg"
              alt=""
              width={746}
              height={560}
              className={cx('image-container')}
            />
            <p className={cx('introduce-text')}>
              “여행의 <b>모든 순간</b>을 특별하게, <br />
              <span className={cx('bold-purple-text')}>트립테리어</span>와
              함께하세요.”
            </p>
          </>
        );
      default:
        return <p>UI디자인 완성후 목업사진</p>;
    }
  };

  return (
    <div className={cx('container')}>
      {renderContent()}

      <div className={cx('pagination')}>
        {Array.from({ length: totalPages }, (_, index) => {
          let activeClass = '';

          if (currentPage === 4 && index === 3) {
            activeClass = cx('yellow-active');
          } else if (currentPage === index + 1) {
            activeClass = cx('purple-active');
          }
          return <div key={index} className={`${cx('dot')} ${activeClass}`} />;
        })}
      </div>

      {currentPage < totalPages ? (
        <button
          type="button"
          className={cx('button', 'next-button')}
          onClick={handleNextClick}
        >
          다음
        </button>
      ) : (
        <button
          type="button"
          className={cx('button', 'kakao-button')}
          onClick={handleLogin}
        >
          <Image
            src="/svgs/kakao-icon.svg"
            alt="카카오톡 로그인"
            className={cx('kakao-icon')}
            width={19}
            height={16}
          />
          카카오톡으로 로그인하기
        </button>
      )}
    </div>
  );
}

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import classNames from 'classnames/bind';
// import styles from './signin.module.scss';

// const cx = classNames.bind(styles);

// export default function Page() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 4;

//   // splash 페이지 3초 후 다음 페이지로 이동
//   useEffect(() => {
//     if (currentPage === 1) {
//       const splashTimer = setTimeout(() => {
//         setCurrentPage(2); // 3초 후 2번 페이지로 이동
//       }, 3000); // 3000ms = 3초

//       // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
//       return () => clearTimeout(splashTimer);
//     }
//   }, [currentPage]);

//   const handleNextClick = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handleLogin = () => {
//     window.location.href =
//       'http://13.209.88.22:8080/oauth2/authorization/kakao'; // Spring Boot 서버의 카카오 로그인 URI
//   };

//   const renderContent = () => {
//     switch (currentPage) {
//       case 1:
//         return (
//           <Image
//             src="/svgs/splash.svg"
//             alt="Splash 이미지"
//             layout="fill" // 부모 요소의 크기에 맞게 이미지 채우기
//             className={cx('image-container')}
//           />
//         );
//       case 2:
//         return (
//           <>
//             <Image
//               src="/svgs/login-center1.svg"
//               alt=""
//               width={310}
//               height={502}
//               className={cx('image-container')}
//             />
//             <p className={cx('introduce-text')}>
//               소중한 <b>가족 여행 기록</b>을
//               <br /> 저장해보세요!
//             </p>
//           </>
//         );
//       case 3:
//         return (
//           <>
//             <Image
//               src="/svgs/login-center2.svg"
//               alt=""
//               width={310}
//               height={502}
//               className={cx('image-container')}
//             />
//             <p className={cx('introduce-text')}>
//               특별한 가족 여행을 위한
//               <br />
//               <b>여정</b>을 준비해보세요!
//             </p>
//           </>
//         );
//       case 4:
//         return (
//           <>
//             <Image
//               src="/svgs/login-center3.svg"
//               alt=""
//               width={310}
//               height={502}
//               className={cx('image-container')}
//             />
//             <p className={cx('introduce-text')}>
//               다른 가족과 <b>여행 추억</b>을
//               <br /> <b>공유</b>할 수 있어요!
//             </p>
//           </>
//         );
//       case 5:
//         return (
//           <>
//             <Image
//               src="/svgs/login-center4.svg"
//               alt=""
//               width={746}
//               height={560}
//               className={cx('image-container')}
//             />
//             <p className={cx('introduce-text')}>
//               “여행의 <b>모든 순간</b>을 특별하게, <br />
//               <span className={cx('bold-purple-text')}>트립테리어</span>와
//               함께하세요.”
//             </p>
//           </>
//         );
//       default:
//         return <p>UI디자인 완성후 목업사진</p>;
//     }
//   };

//   const renderButton = () => {
//     if (currentPage === 1) {
//       // Splash 페이지일 때는 버튼을 보이지 않게
//       return null;
//     }
//     if (currentPage < totalPages) {
//       // 다음 버튼
//       return (
//         <button
//           type="button"
//           className={cx('button', 'next-button')}
//           onClick={handleNextClick}
//         >
//           다음
//         </button>
//       );
//     }
//     if (currentPage === totalPages) {
//       // 카카오 로그인 버튼
//       return (
//         <button
//           type="button"
//           className={cx('button', 'kakao-button')}
//           onClick={handleLogin}
//         >
//           <Image
//             src="/svgs/kakao-icon.svg"
//             alt="카카오톡 로그인"
//             className={cx('kakao-icon')}
//             width={19}
//             height={16}
//           />
//           카카오톡으로 로그인하기
//         </button>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className={cx('container')}>
//       {renderContent()}

//       {/* splash 페이지에서는 pagination도 보이지 않게 */}
//       {currentPage > 1 && (
//         <div className={cx('pagination')}>
//           {Array.from({ length: totalPages }, (_, index) => {
//             let activeClass = '';

//             if (currentPage === 4 && index === 3) {
//               activeClass = cx('yellow-active');
//             } else if (currentPage === index + 1) {
//               activeClass = cx('purple-active');
//             }
//             return (
//               <div key={index} className={`${cx('dot')} ${activeClass}`} />
//             );
//           })}
//         </div>
//       )}

//       {renderButton()}
//     </div>
//   );
// }
