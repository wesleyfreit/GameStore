## Getting Started

#### Requisitos: Node, NPM, PostgreeSQL.

---

**1.** Instalar as depedências do projeto pelo do terminal com o comando:

```bash
npm i
```

**2.** Criar uma database no PostgreeSQL com um nome de sua preferência e instalar a extensão `citext` na database criada.

**3.** Criar um arquivo `.env` na pasta raiz do projeto da API com as seguintes variáveis:

```bash
JWT_SECRET = 'digitos_aleatorios'
DATABASE_URL = 'postgresql://user:password@localhost:5432/mydatabasename'
MAP_KEY = 'google_maps_key'
USER = 'user_admin'
EMAIL = 'email@do.admin'
PASSWORD = '@adminP4ssword'
ADDRESS = 'seu endereço'
LAT = 'latitude do local do seu endereço'
LNG = 'longitude do local do seu endereço'
```

- **_OBS: a variável JWT_SECRET serve como secret na geração dos tokens JWT._**

- **_OBS: a variável DATABASE_URL serve para fazer a conexão com o banco de dados PostgresSQL._**

- **_OBS: a variável MAP_KEY é a chave da api do google maps que no back-end serve para consultar coordenadas recebidas do usuário e retornar o endereço dele._**

- **_OBS: as variáveis USER, EMAIL e PASSWORD, ADDRESS, LAT, LNG servem para definir um admin no banco de dados depois de gerar as tabelas._**


**4.** Criar a pasta `uploads` dentro da pasta `public` que está localizada na raiz do projeto da API.

**5.** Criar duas pastas chamadas `avatars` e `covers` dentro da pasta `uploads` criada anteriormente.

**6.** Gerar o banco de dados e setar o admin através do terminal com o comando:

```bash
npm run db
```

**7.** Rodar o servidor em ambiente de desenvolvimento pelo do terminal com o comando:

```bash
npm run dev
```

**8.** Utilizar o link [http://localhost:8080](http://localhost:8080) no frontend para integrar a API.
