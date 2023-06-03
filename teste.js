function exibirMusicaAleatoria() {
    fetch('/static/assets/songs.json')
      .then(response => response.json())
      .then(jsonData => {
        const albums = Object.keys(jsonData); // Obter os álbuns do JSON
        const randomAlbumIndex = Math.floor(Math.random() * albums.length); // Gerar um índice aleatório para selecionar um álbum
        const album = albums[randomAlbumIndex]; // Selecionar um álbum aleatório
        const musicas = jsonData[album]; // Obter as músicas do álbum selecionado
  
        const musicasArray = Object.entries(musicas); // Converter o objeto de músicas em um array de [chave, valor]
  
        const randomMusicaIndex = Math.floor(Math.random() * musicasArray.length); // Gerar um índice aleatório para selecionar uma música
        const [musica, link] = musicasArray[randomMusicaIndex]; // Selecionar uma música aleatória
  
        const divResultado = document.getElementById('resultado');
        
        // Limpar o conteúdo da div
        divResultado.innerHTML = '';
  
        // Criar elementos HTML para exibir o resultado
        const albumElement = document.createElement('p');
        albumElement.textContent = `Álbum: ${album}`;
        divResultado.appendChild(albumElement);
  
        const musicaElement = document.createElement('p');
        musicaElement.textContent = `Música: ${musica}`;
        divResultado.appendChild(musicaElement);
  
        const linkElement = document.createElement('a');
        linkElement.href = link;
        linkElement.textContent = 'Link';
        divResultado.appendChild(linkElement);
      })
      .catch(error => {
        console.error('Erro ao obter o JSON: ', error);
      });
  }