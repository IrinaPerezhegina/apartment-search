/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import classnames from 'classnames';
import { convertedNumber } from '@/helper/convertedNumber';
import { debounce } from 'lodash';

 type DoubleScrollProps = {
   min_range: number,
   max_range: number,
   min: number,
   max: number,
 };

const DoubleScrollBar = ({
  initialValue, inputData, onChange, label = 'Данные', unit = true, name,
}:{
  onChange:Function, initialValue:{ min:number, max:number },
  inputData:DoubleScrollProps, label:string, unit:boolean, name:string
}) => {
  const { min_range: min, max_range: max } = inputData;
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
    setMaxVal(initialValue.max || max);
    setMinVal(initialValue.min || min);
  }, [initialValue, min, max]);

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

  const onChangeDebounce = useCallback(
    debounce((event : ChangeEvent<HTMLInputElement>) => onChange({
      title: event.target.title,
      name: event.target.name,
      value: event.target.value,
      id: event.target.id,
    }), 800),
    [name, onChange],
  );

  const onChangeMaxInput = (
    event: ChangeEvent<HTMLInputElement>,
    value:number,
  ) => {
    setMaxVal(value);
    onChangeDebounce(event);
  };
  const onChangeMinInput = (
    event: ChangeEvent<HTMLInputElement>,
    value:number,
  ) => {
    setMinVal(value);
    onChangeDebounce(event);
  };

  return (
    <div className="flex flex-col">
      <p className="text-md text-grey font-ev max-sm:text-2xxs">{label}</p>
      <div className="mt-2 flex items-center justify-around h-[55px] w-[428px] max-sm:w-full border-black-100 border-t border-l border-r border-b relative  rounded-base">
        <p className="text-lg font-ev max-sm:text-xs">
          от
          {' '}
          {!unit ? convertedNumber(minVal.toString()) : minVal }
          {' '}
        </p>
        <p className="text-lg font-ev ">
          {' '}
          —
          {' '}
        </p>
        <p className="text-lg font-ev max-sm:text-xs">
          до
          {' '}
          {!unit ? convertedNumber(maxVal.toString()) : maxVal}
          {' '}
        </p>
      </div>
      <div className="mx-auto">
        <input
          id={maxVal.toString()}
          name={name}
          title="min"
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event : ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            // eslint-disable-next-line no-param-reassign
            event.target.value = value.toString();
            onChangeMinInput(event, value);
          }}
          className={classnames('thumb thumb--zindex-3', {
            'thumb--zindex-5': minVal > max - 100,
          })}
        />
        <input
          id={minVal.toString()}
          title="max"
          name={name}
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + 1);
            // eslint-disable-next-line no-param-reassign
            event.target.value = value.toString();
            onChangeMaxInput(event, value);
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
