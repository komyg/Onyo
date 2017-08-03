# Onyo

This project is a proof of concept for Onyo of a frontend to edit a restaurant menu. It was created using Angular 4 and Bootstrap 4.

Currently the frontend loads the menu data from the Onyo backend and supports removing or adding a product.

#### Notes

*   It is only possible to add a fake product to the restaurant menu. Further development is needed to create a dialog that allows the user to choose an existing product or to create a new one.

*   No data is being persisted in the Onyo backend.

## Installation

To execute this project on a local machine you need [Node.js, NPM](https://docs.npmjs.com/getting-started/installing-node) and [Angular CLI](https://cli.angular.io/).

Once all these depenencies are installed, clone or download the project source on your local computer then run the command: `npm install` from a console. Once all the packages are in place, run one of the commands below.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
