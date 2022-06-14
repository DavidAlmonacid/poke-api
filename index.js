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

    const pokemon = {
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      name: formatName(data.name, data.id),
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      spAttack: data.stats[3].base_stat,
      spDefense: data.stats[4].base_stat,
      types: data.types,
    };

    drawCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const drawCard = (object) => {
  const main = document.querySelector('.main-content');
  const template = document.getElementById('template-card').content;
  const templateClone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  const image = templateClone.querySelector('.card__pokemon-picture');
  image.src = object.img;
  image.alt = object.name;

  const name = templateClone.querySelector('.card__pokemon-name');
  name.textContent = object.name;

  const hitPoints = templateClone.querySelector('.card__pokemon-hp');
  hitPoints.textContent = `HP ${object.hp}`;

  const types = templateClone.querySelector('.card__pokemon-types');
  object.types.forEach((el) => {
    const type = el.type.name;
    const span = document.createElement('span');
    span.textContent = type;
    span.style.backgroundColor = `var(--${type})`;

    types.appendChild(span);
  });

  const attack = templateClone.querySelector('.card__pokemon-attack');
  attack.textContent = object.attack;

  const spAttack = templateClone.querySelector('.card__pokemon-sp-attack');
  spAttack.textContent = object.spAttack;

  const defense = templateClone.querySelector('.card__pokemon-defense');
  defense.textContent = object.defense;

  const spDefense = templateClone.querySelector('.card__pokemon-sp-defense');
  spDefense.textContent = object.spDefense;

  fragment.appendChild(templateClone);
  main.appendChild(fragment);
};

document.addEventListener('DOMContentLoaded', () => {
  const randomPokemon = getRandomNumber(386, 495);
  fetchData(randomPokemon);
});
