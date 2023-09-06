## Get-Started

#### Requisitos: Node, NPM.
---
**1.** Instalar as depedências do projeto pelo do terminal com o comando:
```bash
npm i
```
---
**2.** Criar um arquivo ```.env``` na raiz do projeto com as seguintes variáveis:
```bash
JWT_SECRET = 'digitos_aleatorios'
USER = 'user_admin'
EMAIL = 'email@do.admin'
PASSWORD = 'password_admin'
```
* ***OBS: as variáveis USER, EMAIL e PASSWORD servem para definir um adm ao gerar o banco pela primeira vez.***
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
**5.** Abrir o link [http://localhost:8080](http://localhost:8080) com seu navegador.