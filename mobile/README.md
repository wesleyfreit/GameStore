## Getting Started

#### Requisitos: Node, NPM, Android Studio.


**1.** Instalar as depedências do projeto pelo do terminal com o comando:

```bash
npm i
```

**2.** Criar um arquivo chamado `local.properties` na pasta android que fica localizada dentro da pasta raiz do projeto mobile, com as seguintes variáveis:

```bash
MAPS_API_KEY = google_maps_key
```

- **_OBS: a variável MAPS_API_KEY serve para abrir no mapa no aplicativo._**

**3.** Criar um arquivo `.env` na pasta raiz do projeto mobile com as seguintes variáveis:

```bash
URL_API = 'http://url.api.com'
```

- **_OBS: a variável URL_API serve para fazer a conexão com a API._**

**4.** Definir um emulador android no Android Studio para rodar a aplicação.

**5.** Executar o servidor da aplicação com o seguinte comando.
```bash
npm start
```

- **_OBS: Depois de executar o comando, pressionar a tecla A para abrir no ambiente android e selecionar o emulador correto._**
