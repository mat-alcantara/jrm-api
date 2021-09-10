


# JRM App - API

This is the API used by the project JRM Compensados

## Build with

- Nodejs
- Express
- Typescript
- Jest
- TypeORM
- Postgres
- bcryptjs
- celebrate
- jsonwebtoken
- pdfkit
- tsyringe
- date-fns
- CORS

## Installation
First you need to clone this repository

```bash
git clone https://github.com/mat-alcantara/jrm-api jrm-api
```

Go to the repository's folder

```bash
cd jrm-api
```

Install everything

```bash
npm install
```

## Usage

To use this project, you'll need to create a [Docker container](https://www.docker.com/) using postgres as image.

Then use .env.example in root folder to create your .env.local

After everything's ok, just run

```bash
npm run dev:server
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
