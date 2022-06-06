function getRandomNumber(min, max) {
  let randomNumber = Math.round(Math.random() * (max - min)) + min;

  if (randomNumber === min) randomNumber++;
  else if (randomNumber === max) randomNumber--;

  return randomNumber;
}

// https://pokeapi.co/api/v2/pokemon?limit=108&offset=386
const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const randomPokemon = getRandomNumber(385, 496);
  console.log(randomPokemon);
  fetchData(randomPokemon);
});
