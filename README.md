# Projeto Vite + React + Chakra UI

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)![Chakra UI](https://img.shields.io/badge/Chakra--UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)

Este projeto é uma aplicação frontend construída com **React** e **Vite**, utilizando a biblioteca de componentes **Chakra UI** para a interface. A aplicação gerencia departamentos e cursos, consumindo uma API REST externa para realizar operações CRUD (Criar, Ler, Atualizar e Deletar).

O projeto está configurado para ser facilmente implantado na **Vercel**, com suporte a variáveis de ambiente para a configuração da URL da API.


## ✨ Funcionalidades

-   **Listagem** de departamentos e cursos.
-   **Criação e Edição** através de modais com formulários controlados.
-   **Exclusão** de itens com modal de confirmação.
-   **Comunicação** com API REST utilizando Axios.


## 🛠️ Tecnologias Utilizadas

-   **React 18+**
-   **Vite**
-   **Chakra UI**
-   **Axios** para requisições HTTP
-   **Vercel** para deploy
-   **JavaScript (ES6+)**


## 📋 Pré-requisitos

-   **Node.js** (v16 ou superior)
-   **NPM** ou **Yarn**
-   Conta na **Vercel** (opcional, para deploy)


## 🚀 Rodando o Projeto Localmente

1.  Clone o repositório:

    ```bash
    git clone https://github.com/podeveza/front-fafire-2025
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Crie um arquivo `.env` na raiz do projeto e adicione a variável de ambiente:
    ```bash
    VITE_API_URL=[https://sua-api.com](https://sua-api.com)
    ```

4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.



## 📦 Build para Produção

Para gerar a versão otimizada do projeto para produção, execute o comando:

```bash
npm run build
```
Os arquivos otimizados serão gerados no diretório dist/.

## ☁️ Deploy na Vercel
Faça login na sua conta da Vercel.
Importe seu repositório do GitHub para criar um novo projeto.
A Vercel detectará automaticamente que é um projeto Vite.
Vá para Settings > Environment Variables e adicione a variável:
```bash
Nome	Valor	Ambiente
VITE_API_URL	URL da sua API em produção	Production
```

5.  Clique em Deploy e aguarde a finalização do processo.

## 📁 Estrutura do Projeto
```bash
/
├── public/                # Arquivos estáticos
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas da aplicação
│   ├── App.jsx            # Componente raiz
│   └── main.jsx           # Ponto de entrada da aplicação
├── .env                   # Variáveis de ambiente (não versionado)
├── vite.config.js         # Configurações do Vite
├── package.json           # Dependências e scripts
└── README.md              # Documentação do projeto
```

## 🔑 Variáveis de Ambiente
Para funcionar corretamente, a aplicação requer a seguinte variável de ambiente. Lembre-se que, no Vite, variáveis expostas ao cliente devem começar com o prefixo VITE_.

``` bash
Variável	Descrição	Exemplo
VITE_API_URL	URL base da API para requisições.	https://api.meuprojeto.com
```
