import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';
import useHttp from '../../http-hook/use-http';

const AvailableMeals = () => {

  const [ mealsData, setMealsData ] = useState([]);
  const { isLoading, hasError: httpError, sendRequest: fetchMealData } = useHttp();

//   useEffect(() => {
//   const fetchMealData = async () => {
//     const response = await fetch("https://http-requests-14d51-default-rtdb.europe-west1.firebasedatabase.app/meals.json")
//     const responseData = await response.json();
// //transform the object from db to array 
//     const loadedMeals = [];

//     if (!response.ok) {
//       throw new Error('Something went wrong');
//     }
    
//     for (const key in responseData) {
//       loadedMeals.push({
//         id: key,
//         name: responseData[key].name,
//         description: responseData[key].description,
//         price: responseData[key].price
//       })
//     }
//     setMealsData(loadedMeals);
//     setIsLoading(false);
//     }
//     // try {
//     //   fetchMealData();
//     // } catch (error) {
//     //   setIsLoading(false);
//     //   setHttpError(error.message)
//     // }

//     fetchMealData().catch(error => {
//       setIsLoading(false);
//       setHttpError(error.message)
//     })

//   },[])

const responseData = (dataObj) => {
  const loadedMeals = [];
  for (const key in dataObj) {
    loadedMeals.push({
      id: key,
      name: dataObj[key].name,
      description: dataObj[key].description,
      price: dataObj[key].price
    })
  }
  setMealsData(loadedMeals);
}

useEffect(() => {
     fetchMealData({
      url: 'https://http-requests-14d51-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
     }, responseData)
  }, [])

  console.log(mealsData)

  if (isLoading) {
    return (
      <section className={classes.loadingSection}>
        <p>Loading... {isLoading}</p>
      </section>
    )
  }

  if (httpError) {
    console.log(httpError)
    return (
      
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

    const mealsList = mealsData.map(meal => (
      <MealItem 
      id={meal.id}
      key={meal.id}
      //meal={meal}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
    ))

    return <section className={classes.meals}>
        <Card>
        <ul>
          {mealsList}
        </ul>
        </Card>  
    </section>
}

export default AvailableMeals;