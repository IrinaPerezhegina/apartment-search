import { memo, useMemo } from 'react';

const Select = () => {
//   const onSelect = (e:MouseEvent) => {
//     props.onChange(e.target.value);
//   };
  const options = {
    // Варианты сортировок
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };
  return (
    <select className="Select" value="value">
      {options.sort.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};
export default memo(Select);

// {
//     "data": {
//         "projects": [
//             {
//                 "id": 1,
//                 "title": "Christine Lehner",
//                 "is_active": false,
//                 "disabled": false
//             },
//             {
//                 "id": 2,
//                 "title": "Dr. Marion Wuckert V",
//                 "is_active": false,
//                 "disabled": true
//             },
//             {
//                 "id": 3,
//                 "title": "Nella Jaskolski",
//                 "is_active": false,
//                 "disabled": true
//             },
//             {
//                 "id": 4,
//                 "title": "Prof. Kyle Williamson",
//                 "is_active": false,
//                 "disabled": true
//             },
//             {
//                 "id": 5,
//                 "title": "Leonor Zboncak",
//                 "is_active": false,
//                 "disabled": true
//             }
//         ],
//         "rooms": [
//             {
//                 "number": 0,
//                 "is_active": false,
//                 "disabled": false
//             },
//             {
//                 "number": 1,
//                 "is_active": false,
//                 "disabled": false
//             },
//             {
//                 "number": 3,
//                 "is_active": false,
//                 "disabled": false
//             },
//             {
//                 "number": 2,
//                 "is_active": false,
//                 "disabled": false
//             },
//             {
//                 "number": 4,
//                 "is_active": false,
//                 "disabled": false
//             }
//         ],
//         "price": {
//             "min_range": 2027947,
//             "max_range": 14994017,
//             "min": 2027947,
//             "max": 14994017
//         },
//         "square": {
//             "min_range": 20,
//             "max_range": 100,
//             "min": 20,
//             "max": 100
//         }
//     }
// }
