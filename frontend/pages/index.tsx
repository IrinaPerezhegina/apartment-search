import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Item from '../components/Item';

const HomePage: NextPage = () => {
  const [, setData] = useState([]);
  const fetchProps = async () => {
    const response = await fetch('http://localhost:8083/api/v1/flats');
    const data = await response.json();
    console.log(data);

    setData(data.data);
  };
  useEffect(() => {
    fetchProps();
    console.log('gg');
  }, []);
  console.log('h');

  const user = {
    id: 109,
    project_title: 'Кристина Ленер',
    rooms: 3,
    studio: false,
    price: '2474441',
    old_price: '14742111',
    square: '62',
    release_dates: '3\u043a\u0432.2026',
    floor: '1',
    image: 'https://via.placeholder.com/640x480. png/00bbdd?text=veniam',
  };

  return (
    <div className="container ">
      <h4 className="">ПЛАНИРОВКИ </h4>
      <Item />
      {/* <Heading tag="h1" text="Hello" /> */}
    </div>
  );
};

export default HomePage;
