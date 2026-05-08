const TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGI2MDRhOGRkMmRkOWY5OGIwNDdkYzRmNWRlYTMwNyIsIm5iZiI6MTc3NzU1OTUzMS41NjQ5OTk4LCJzdWIiOiI2OWYzNjdlYjZkNDY1NTZkOGViNzIxN2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7npxWyEU6UXnx4APUvFFLrAUtpMmatya1bbelWCNzKY";

const URL_FILMES = "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR";

const lista = document.getElementById("listaFilmes");

const inputBusca = document.getElementById("buscar");

let filmes = [];

const generos = [
  { id: 28, name: "Ação" },
  { id: 12, name: "Aventura" },
  { id: 16, name: "Animação" },
  { id: 35, name: "Comédia" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentário" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Família" },
  { id: 14, name: "Fantasia" },
  { id: 36, name: "História" },
  { id: 27, name: "Terror" },
  { id: 10402, name: "Música" },
  { id: 9648, name: "Mistério" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Ficção científica" },
  { id: 10770, name: "Cinema TV" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "Guerra" },
  { id: 37, name: "Faroeste" }
];

function pegarGeneros(ids) {
  return ids
    .map(function(id) {
      const genero = generos.find(function(g) {
        return g.id === id;
      });
      return genero ? genero.name : null;
    })
    .filter(function(nome) {
      return nome !== null;
    })
    .join(", ");
}

function mostrarFilmes(listaFilmes) {
  lista.innerHTML = "";

  listaFilmes.forEach(function(filme) {
    const imagem = filme.poster_path
      ? "https://image.tmdb.org/t/p/w185" + filme.poster_path
      : "";

    const generosTexto = pegarGeneros(filme.genre_ids);

    lista.innerHTML += `
      <div class="filme">
        ${imagem ? `<img src="${imagem}">` : ""}
        <h2>${filme.title}</h2>
        ${generosTexto ? `<p>${generosTexto}</p>` : ""}
      </div>
    `;
  });
}

async function buscarFilmes() {
  const resposta = await fetch(URL_FILMES, {
    headers: {
      Authorization: "Bearer " + TOKEN
    }
  });

  const dados = await resposta.json();

  filmes = dados.results;

  mostrarFilmes(filmes);
}

inputBusca.addEventListener("input", function() {
  const texto = inputBusca.value.toLowerCase();

  const filtrados = filmes.filter(function(filme) {
    return (
      filme.title.toLowerCase().includes(texto) ||
      filme.overview.toLowerCase().includes(texto)
    );
  });

  mostrarFilmes(filtrados);
});

buscarFilmes();