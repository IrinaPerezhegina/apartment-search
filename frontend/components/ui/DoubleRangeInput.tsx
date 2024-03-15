 type DoubleRangeProps = {
   min_range: number,
   max_range: number,
   min: number,
   max: number,

 };

const DoubleRangeInput = ({ price }:{ price:DoubleRangeProps }) => (

  <div className="">
    <input
      type="range"
      min={price.min}
      max={price.max}
      className=""
    />
    <input
      type="range"
      min={price.min}
      max={price.max}
      className=""
    />
  </div>
);

export default DoubleRangeInput;

//   "data": {
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
