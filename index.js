const getRandomNumber = (min, max) => {
  let randomNumber = Math.round(Math.random() * (max - min)) + min;

  if (randomNumber === min) randomNumber++;
  else if (randomNumber === max) randomNumber--;

  return randomNumber;
};

const formatName = (name, id) => {
  const words = name.split('-');
  const capitalizedWords = words.map(
    (word) => word[0].toUpperCase() + word.slice(1)
  );
  const newName = capitalizedWords.join(' ');

  if (id === 413) return newName + ' Cloak';
  else if (id === 439) return newName + '.';
  else if (id === 474) return newName.replace(' ', '-');
  else if (id === 487 || id === 492) return newName + ' Forme';

  return newName;
};

const fetchData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    drawCard(data, id);
  } catch (error) {
    console.log(error);
  }
};

const drawCard = (pokemon, pokemonNumber) => {
  console.log(pokemon); // Remove

  const main = document.querySelector('.main-content');
  const template = document.getElementById('template-card').content;
  const templateClone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  const pokemonName = formatName(pokemon.name, pokemonNumber);

  const image = templateClone.querySelector('.card__pokemon-picture');
  image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`;
  image.alt = pokemonName;

  fragment.appendChild(templateClone);
  main.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', () => {
  const randomPokemon = getRandomNumber(386, 495);
  console.log(randomPokemon); // Remove
  fetchData(randomPokemon);
});
