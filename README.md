# TodoList / TravelList

This is a quick TodoList / TravelList example, with data fetched from [restcountries.eu](https)

---

## Requirements

For development, you will only need Node.js 14. It is also recommended to use `Node Version Manager` (`nvm`).
Alternatively, you can use Docker.

## Install & run locally

    $ git clone git@github.com:NicolasBonduel/travellist.git
    $ cd travellist

    // if you use nvm, otherwise, make sure you are using node 14:
    $ nvm use

    $ npm i
    $ npm run dev
    $ open localhost:3000

## Install & run with Docker

    $ docker compose up

    // Alternatively, with "docker-compose":
    $ docker-compose up

    $ open localhost:3000
    // Note: It can take a couple minutes before the server is accessible

## Simple build for production

    $ npm run build
    $ npm run start

## TODO

- [ ] Convert to TypeScript
- [ ] Handle errors
- [ ] Improve search result
- [ ] Create tests on StoryBook with [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
