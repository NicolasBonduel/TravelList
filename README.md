# TodoList / TravelList

This is a quick TodoList / TravelList example, with data fetched from [restcountries.eu](https://restcountries.eu)

You can find a live demo [here](https://nicolasbonduel.github.io/TravelList)

---

## Requirements

For development, you will only need Node.js 14. It is also recommended to use `Node Version Manager` (`nvm`).
Alternatively, you can use Docker.

## Install & run locally

    $ git clone git@github.com:NicolasBonduel/TravelList.git
    $ cd TravelList

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

## Storybook

You can access this repository's Storybook [here](https://60db5de48b2c160039814add-vgbewjwbhr.chromatic.com)

You can also run it locally with:

    $ npm run storybook

## Tests

Snapshot tests are run with @storybook/addon-storyshots.
Unit tests are run with @testing-library/react.

You can run them with:

    $ npm run test

Note: Visual tests are also set up on [Chromatic](https://www.chromatic.com/build?appId=60db5de48b2c160039814add)

## TODO

- [ ] Convert to TypeScript
- [ ] Handle errors
- [ ] Improve search result
- [ ] Improve and fix unit tests
