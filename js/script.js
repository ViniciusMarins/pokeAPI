// Pokemon
const pokemon_name = document.querySelector(".pokemon_name");
const pokemon_number = document.querySelector(".pokemon_number");
const pokemon_image = document.querySelector(".pokemon_image");

//Form
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const icon_clear = document.querySelector(".search_icon");

//Botões
const botao_next = document.querySelector(".btn-next");
const botao_prev = document.querySelector(".btn-prev");

let current_pokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status == 200) {
    const dados = await APIResponse.json();

    return dados;
  }
};

const renderPokemon = async (pokemon) => {
  pokemon_name.innerHTML = "Loading...";
  pokemon_number.innerHTML = "";
  pokemon_image.style.display = "block";
  pokemon_image.setAttribute("src", "images/loading.gif");

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemon_name.innerHTML = data.name;
    pokemon_number.innerHTML = data.id;
    pokemon_image.setAttribute(
      "src",
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ]
    );
    input.value = "";
    current_pokemon = data.id;
  } else {
    pokemon_name.innerHTML = "Not Found =[";
    pokemon_number.innerHTML = "";
    pokemon_image.style.display = "none";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

botao_next.addEventListener("click", () => {
  current_pokemon++;
  renderPokemon(current_pokemon);
});

botao_prev.addEventListener("click", () => {
  if (current_pokemon > 1) {
    current_pokemon--;
    renderPokemon(current_pokemon);
  }
});

icon_clear.addEventListener("click", () => {
  input.value = "";
});

renderPokemon(current_pokemon);
