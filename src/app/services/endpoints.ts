export const basicUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
}

export const categoriesUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
}

export const randomRecipeUrls = {
  meals: 'https://www.themealdb.com/api/json/v1/1/random.php',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
}

export const searchUrls = {
  options: (radioValue: string, inputValue: string) => {
    let type = 'i';
    let searchParam = 'search';
    switch (radioValue) {
      case 'ingredient':
        searchParam = 'filter';
        break;
      case 'name':
        type = 's';
        break;
      case 'firstLetter':
        type = 'f';
        break;
    }
    return { type, searchParam, inputValue };
  },
  meals: (radioValue: string, inputVal: string) => {
    const { type, searchParam, inputValue } = searchUrls.options(radioValue, inputVal);
    return `https://www.themealdb.com/api/json/v1/1/${searchParam}.php?${type}=${inputValue}`;
  },
  drinks: (radioValue: string, inputVal: string) => {
    const { type, searchParam, inputValue } = searchUrls.options(radioValue, inputVal);
    return `https://www.thecocktaildb.com/api/json/v1/1/${searchParam}.php?${type}=${inputValue}`;
  },
}
