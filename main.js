const types = ["normal","fire","water","grass","electric","ice",
"fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"]

const imgPokemon = document.querySelector(".imgPokemon");
const nomeDoPokemon = document.querySelector("#nome-do-pokemon");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#lupa__search");
const iconTypeFirst = document.querySelector("#type__icon-one");
const iconTypeSecond = document.querySelector("#type__icon-two");
const firstType = document.querySelector("#first-type");
const secondType = document.querySelector("#second-type");
const pesoPokemon = document.querySelector("#peso__info");
const alturaPokemon = document.querySelector("#altura__info");
const cenario = document.querySelector("#cenario__background");
const flavorText = document.querySelector("#flavor-text");
const descricaoInfo = "descricaoPokemon.json";

btnSearch.addEventListener("click",(e)=> {
    const nomePokemon = search.value.toLowerCase();
    searchPokemon(nomePokemon)
})

search.addEventListener("keydown", (e)=> {
    if(e.key === "Enter"){
        e.preventDefault()
        btnSearch.click()
    }
})

async function searchPokemon(nomePokemon) {
    try{    
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
        const apiConvertida = await api.json();

        try {
            const descricaoPokemon = await fetch(descricaoInfo);
            const respostaDescricao = await descricaoPokemon.json();

            const pokemonInformacoes = [
                `respostaDescricao.kanto`,
                `respostaDescricao.kanto.${apiConvertida.name}.descricao`,
                `respostaDescricao.kanto.${apiConvertida.name}.id`
            ];

            const responseNamePokemon = eval(pokemonInformacoes[0]);
            const responseFlavorPokemon = eval(pokemonInformacoes[1]);
            const responsePokemonID = eval(pokemonInformacoes[2]);

            if(nomePokemon in responseNamePokemon || responsePokemonID) {
                flavorText.textContent = responseFlavorPokemon; 
            }
        }catch {
            flavorText.textContent = "Em breve, a descrição deste Pokémon estará disponível."
        }



        let spritePokemon = apiConvertida.sprites.front_default;
        imgPokemon.setAttribute("src", spritePokemon);

        nomeDoPokemon.textContent = apiConvertida.name;

        const verificaListaTipos = apiConvertida.types.length;

        const typeValueFirst = firstType.textContent = apiConvertida.types[0].type.name;
    
        if(types.includes(typeValueFirst)) {
           iconTypeFirst.setAttribute("src", `/img/icons/${typeValueFirst}.svg`)
        }

        if(verificaListaTipos <= 1) {
            secondType.textContent = ""
            iconTypeSecond.setAttribute("src", `/img/icons/normal.svg`)    

        }else{
            const typeValueSecond = secondType.textContent = apiConvertida.types[1].type.name;

            if(types.includes(typeValueSecond)) {
                iconTypeSecond.setAttribute("src", `/img/icons/${typeValueSecond}.svg`)    
            }
        }

        switch (typeValueFirst) {
            case "water":
                cenario.setAttribute("src", "/img/oceano.jpg");     
                break;
            
            case "fire":
                cenario.setAttribute("src", "/img/fogo.jpg");     
                break;
            
            case "ghost":
                cenario.setAttribute("src", "/img/ghostHouse.jpg");     
                break;
            
            case "ice":
                cenario.setAttribute("src", "/img/neve.jpg");     
                break;
            
            case "ground":
                cenario.setAttribute("src", "/img/terra.jpg");     
                break;
            
            case "rock":
                cenario.setAttribute("src", "/img/terra.jpg");     
                break;
            
            case "psychic":
                cenario.setAttribute("src", "/img/lendario.jpg");     
                break;
            
            case "dragon":
                cenario.setAttribute("src", "/img/cenarioDragon.jpg");     
                break;
            
            case "dark":
                cenario.setAttribute("src", "/img/darkCenario.jpg");     
                break;
            
            case "normal":
                if(apiConvertida.types[1] && apiConvertida.types[1].type && apiConvertida.types[1].type.name === "flying") {
                    cenario.setAttribute("src", "/img/sky.jpg");  
                }else{
                    cenario.setAttribute("src", "/img/floresta.jpg");
                } 
                break;
            
            default:
                cenario.setAttribute("src", "/img/floresta.jpg");
                break;
        }

        pesoPokemon.textContent = parseFloat(apiConvertida.weight / 10).toFixed(1) + "kg";
        alturaPokemon.textContent = parseFloat(apiConvertida.height / 10).toFixed(1) + "m";
    }catch(error) {
        console.error("nome do pokemon ou informação inválida!")
    }
}