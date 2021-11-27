import { Drink } from '../models/Drink';
import { Meal } from '../models/Meal';

export const mealObjFormatter = (mealObj: Meal) => ({
  id: mealObj.idMeal,
  title: mealObj.strMeal,
  drinkAlternate: mealObj.strDrinkAlternate,
  category: mealObj.strCategory,
  area: mealObj.strArea,
  instructions: mealObj.strInstructions,
  thumbnail: mealObj.strMealThumb,
  tags: mealObj.strTags,
  video: mealObj.strYouTube,
  source: mealObj.strSource,
});

export const drinkObjFormatter = (drinkObj: Drink) => ({
  id: drinkObj.idDrink,
  title: drinkObj.strDrink,
  drinkAlternate: drinkObj.strDrinkAlternate,
  tags: drinkObj.strTags,
  video: drinkObj.strVideo,
  category: drinkObj.strCategory,
  iba: drinkObj.strIBA,
  alcoholic: drinkObj.strAlcoholic,
  glass: drinkObj.strGlass,
  instructions: drinkObj.strInstructions,
  thumbnail: drinkObj.strDrinkThumb
});
