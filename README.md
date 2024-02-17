## Projeto de CRUD de Times de Futebol e Jogadores

Este é um projeto que oferece funcionalidades básicas de CRUD (Create, Read, Update, Delete) para times de futebol e jogadores associados a esses times. O projeto utiliza Azure Blob Storage para armazenar as imagens dos escudos dos times.

### Funcionalidades

- Adicionar, visualizar, atualizar e excluir times de futebol, incluindo o upload de escudo.
- Adicionar, visualizar, atualizar e excluir jogadores associados aos times.

### Tecnologias Utilizadas

- **Frontend**: O frontend foi desenvolvido utilizando [Nextjs](https://nextjs.org/) e está hospedado na [Vercel](https://vercel.com/).
- **Backend**: O backend foi desenvolvido em uma aplicação Node.js e está hospedado na [Railway](https://railway.app/).
- **Armazenamento de Imagens**: As imagens dos escudos dos times são armazenadas no [Azure Blob Storage](https://azure.microsoft.com/services/storage/blobs/).
- **Deploy com Docker Compose**: Utilizou-se Docker Compose para orquestrar os contêineres do frontend e backend.
