const BASE_URL = 'https://restcountries.com/v2/name/';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}${name}`).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return response.json();
  });
};
