# t3-chakra-starter 

this is a [T3 Stack](https://create.t3.gg/) template mainly replacing tailwind with chakra ui.
it has basic CRUD functionality and dark mode

## libraries
(included in create-t3-app)
- NextAuth 
- trpc
- prisma

extras:
- chakra-ui
- react-hook-form
- zod validation w/ hook form

# usage 
### 1. Select <b>Create a new repository</b>.

![select repo img](https://docs.github.com/assets/cb-95207/mw-1000/images/help/repository/use-this-template-button.webp)

### 2. add dependencies

```sh
cd <your-app-name>
yarn
```
or using npm

```sh
cd <your-app-name>
npm i
```

### 3. set up the database

This template uses [cockroachdb](https://cockroachlabs.cloud/) as the default database. You can change the database URL 
in your `.env` file.

```sh
npx prisma db push
```

### 4. run the app

```sh
yarn dev
```

or

```
npm run dev
```

