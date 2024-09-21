import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const mainApi = [
    {
      id: 1,
      author: '해바라기',
      location: '제주도',
      date: '2024.09.14',
      title: '제주도가죠와',
      content:
        '하늘도 이쁘고 어쩌구 저쩌구 또 가고싶은 여행지다 어쩌구저쩌구어쩌구어쩌구',
      image: '/path/to/image1.jpg',
    },
    {
      id: 2,
      author: '별빛사랑',
      location: '서울',
      date: '2024.09.15',
      title: '서울의 밤',
      content: '서울의 밤은 언제나 아름답고 어쩌구 저쩌구',
      image: '/path/to/image2.jpg',
    },
    {
      id: 3,
      author: '바람의노래',
      location: '부산',
      date: '2024.09.16',
      title: '부산에서 보내는 하루',
      content: '부산의 바다와 맛집들이 인상적이었던 하루 어쩌구 저쩌구',
      image: '/path/to/image3.jpg',
    },
    {
      id: 4,
      author: '초록나무',
      location: '강릉',
      date: '2024.09.17',
      title: '강릉의 푸른 바다',
      content: '강릉에서 본 푸른 바다는 정말 인상적이었다 어쩌구 저쩌구',
      image: '/path/to/image4.jpg',
    },
    {
      id: 5,
      author: '달빛여행자',
      location: '인천',
      date: '2024.09.18',
      title: '인천의 일몰',
      content: '인천의 일몰을 보면서 하루를 마무리하다 어쩌구 저쩌구',
      image: '/path/to/image5.jpg',
    },
  ];

  // JSON 형식으로 응답
  res.status(200).json(mainApi);
}
