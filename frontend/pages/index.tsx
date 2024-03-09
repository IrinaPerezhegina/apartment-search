import { NextPage } from 'next';
import { useEffect, useState } from 'react';
// import Button from '@/components/ui/Button';
import Item from '../components/Item';

const HomePage: NextPage = () => {
  const [page, setPage] = useState(1);
  const [date, setDate] = useState([]);
  const fetchProps = async () => {
    const response = await fetch(`http://localhost:8083/api/v1/flats?page=${page}`);
    const data = await response.json();

    setDate(data.data);
  };
  useEffect(() => {
    fetchProps();
  }, [page]);
  useEffect(() => {
    fetchProps();
  }, []);
  return (
    <div className="container px-1 pt-10 pb-8 mx-auto">
      <h4 className="">ПЛАНИРОВКИ </h4>
      <div className="basis-1/3 gap-y-5 justify-center items-center flex gap-5 flex-wrap box-border">
        {date.map((el) => (
          <Item item={el} key={el.id} />

        ))}
        {/* <Button onClick={() => setPage((prev) => prev + 1)}>hhh</Button> */}
        <button onClick={() => setPage((prev) => prev + 1)} type="button" className="text-white text-xl bg-blue w-[580px] h-[58px] rounded">
          Показать еще 15 из 20
        </button>
      </div>

    </div>
  );
};

export default HomePage;
