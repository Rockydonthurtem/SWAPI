// import axios from 'axios';
// import {React, useState, useEffect} from 'react';



// export default function Food() {
//     const [food, setFood] = useState([])
  
//     useEffect( () => {
//         const handleFood = async() => {
//             // setLoading(true)
//             try {
//                 const response = await axios.get('https://cors-anywhere.herokuapp.com/https://guac-is-extra.herokuapp.com/?name=fish')
//                 console.log(`food..... ${response}`);
//                 setFood(Array.from(response.data.results))
//                 // handleSort(planets)
//                 // handlePopulation(planets)
//                 // handleSurfaceWater(planets)
//             } catch (error) {
//                 console.log(`ERROR: ${error.message}`); 
//                 // setisError(true)
//             }
//             // setisError(false)
//             // setLoading(false)
//         }
//         handleFood();
//     }, []);
  
  
  
  
//     return <div></div>;
// }
