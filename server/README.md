## Get-Started

#### Requisitos: Node, NPM.

---

**1.** Instalar as depedências do projeto pelo do terminal com o comando:

```bash
npm i
```

---

**2.** Criar um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
JWT_SECRET = 'digitos_aleatorios'
DATABASE_URL = 'postgresql://user:password@localhost:5432/mydatabasename'
USER = 'user_admin'
EMAIL = 'email@do.admin'
PASSWORD = 'password_admin'
MAP_KEY = 'google_maps_key'
```

- **_OBS: a variável JWT_SECRET serve como secret na geração dos tokens JWT._**

- **_OBS: a variável DATABASE_URL serve para fazer a conexão com o banco de dados PostgresSQL._**

- **_OBS: as variáveis USER, EMAIL e PASSWORD servem para definir um admin ao gerar as tabelas do banco de dados pela primeira vez._**

- **_OBS: a variável MAP_KEY é a api do google maps que no back-end serve para consultar coordenadas recebidas do usuário e retornar o endereço dele._**

---

**3.** Gerar o banco de dados e setar o admin através do terminal com o comando:

```bash
npm run db
```

---

**4.** Rodar o servidor em ambiente de desenvolvimento pelo do terminal com o comando:

```bash
npm run dev
```

---

**5.** Utilize o link [http://localhost:8080](http://localhost:8080) no frontend para integrar a API.
