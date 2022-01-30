const pokemon = document.querySelector('input');
const pokedex = document.querySelector('.pokedex')

pokemon.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const promiseResposta = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.value}`);
        promiseResposta.then((resposta) => {
            if (!resposta.ok) {
                while (pokedex.firstChild) {
                    pokedex.removeChild(pokedex.firstChild);
                }
                const h1 = document.createElement('h1');
                pokedex.appendChild(h1);
                const nomePokemon = document.querySelector('h1');
                nomePokemon.textContent = `${pokemon.value} não encontrado no banco de dados da pokedex!`
                return;
            }
            const promiseBody = resposta.json();

            promiseBody.then((body) => {
                while (pokedex.firstChild) {
                    pokedex.removeChild(pokedex.firstChild);
                }
                const h1 = document.createElement('h1');
                const img = document.createElement('img');
                const h2 = document.createElement('h2');

                pokedex.appendChild(h1);
                pokedex.appendChild(img);
                pokedex.appendChild(h2);

                const nomePokemon = document.querySelector('h1');
                const imgPokemon = document.querySelector('img');
                const habilidades = document.querySelector('h2');

                nomePokemon.textContent = body.name[0].toUpperCase() + body.name.substring(1).toLowerCase();
                imgPokemon.src = body.sprites.front_default;
                habilidades.textContent = 'Habilidades:'

                for (i in body.abilities) {
                    const li = document.createElement('li');
                    pokedex.appendChild(li);
                    const lista = document.querySelectorAll("li");
                    lista[i].textContent = body.abilities[i].ability.name;
                }
            });
        });
    }
})