import {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from 'classnames';
import { convertedNumber } from '@/helper/convertedNumber';

 type DoubleScrollProps = {
   min_range: number,
   max_range: number,
   min: number,
   max: number,

 };

const DoubleScrollBar = ({
  price, onChange, label = 'Данные', unit = true,
}:{ onChange:Function, price:DoubleScrollProps, label:string, unit:boolean }) => {
  const { min, max } = price;
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max],
  );
  useEffect(() => {
    setMaxVal(max);
    setMinVal(min);
  }, [max, min]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);
  return (
    <div className="flex flex-col">
      <p className="text-md text-grey font-ev">{label}</p>
      <div className="mt-2 flex items-center justify-around h-[55px] w-[428px] border-black-100 border-t border-l border-r border-b relative  rounded-base">
        <p className="text-lg font-ev">
          от
          {' '}
          {!unit ? convertedNumber(minVal.toString()) : minVal }
          {' '}

        </p>
        <p className="text-lg font-ev">
          {' '}
          —
          {' '}
        </p>

        <p className="text-lg font-ev">
          до
          {' '}
          {!unit ? convertedNumber(maxVal.toString()) : maxVal}
          {' '}

        </p>

      </div>
      <div className="mx-auto">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            // eslint-disable-next-line no-param-reassign
            event.target.value = value.toString();
          }}
          className={classnames('thumb thumb--zindex-3', {
            'thumb--zindex-5': minVal > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            // eslint-disable-next-line no-param-reassign
            event.target.value = value.toString();
          }}
          className="thumb thumb--zindex-4"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
        </div>
      </div>
    </div>
  );
};
export default DoubleScrollBar;
