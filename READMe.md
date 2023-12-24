# Forkify

<br />
<p align="center">
    <img src="/src/img/logo.png?raw=true" width="100%" height="100%">
  </a>

  <p align="center">
    Application to Search Food recipe made with javascript.
    <br />
    <br />
    <br />
    <a href="https://forkfy-app.netlify.app/">View Demo</a>
  </p>
</p>

## About The Project

Forkify, a vanilla JavaScript application, seamlessly connects users to a treasure trove of culinary possibilities through the Forkify API. This intuitive platform not only lets you search for and save your favorite recipes but also empowers you to customize serving sizes to fit your needs. Dive into detailed cooking directions, ensuring your culinary adventures are both delicious and tailored to perfection. With its user-friendly interface, Forkify elevates your cooking experience by putting control and creativity at your fingertips.

### Built With

This app is built with pure vanilla JavaScript along with HTML and SCSS. It uses parcel as module bundler and NPM as package manager.

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [SCSS](https://sass-lang.com/)
- [Vanilla JavaScript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [Parcel](https://parceljs.org/)
- [NPM](https://www.npmjs.com/)

## Getting Started

To get started with project just simply fork this repo or download locally on your System.

To get a local copy up and running follow these simple example steps.

### Prerequisites

Start with the latest version of NPM to avoid any errors:

- npm
  ```sh
  npm install npm@latest -g
  ```
- Also install additional dependencies

```sh
 npm i --save core-js regenerator-runtime
```

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/RohitPatel1122/forkify-app.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Get a free API Key at [Forkify API_KEY](https://forkify-api.herokuapp.com/v2) and Enter your API KEY in `config.js`
   ```JS
   const KEY = 'ENTER YOUR API';
   ```

## Usage

1. The Forkify Recipe App allows users to search for recipes.

2. Users can view the recipe along with the cook time and also
   increase or decrease the amount of servings they need.

3. Bookmarked recipes are stored in local storage so no database was
   required for this application.

_Please refer to the [Forkify API Documentation](https://forkify-api.herokuapp.com/v2) for more details._

## Roadmap

See the [open issues](https://github.com/RohitPatel1122/forkify-app/issues) for a list of proposed features (and known issues).

### Proposed features

1. Number of pages between the pagination buttons.

2. Ability to sort search results by duration or number of ingredients.

3. Ingredient validation in view, before submitting the form.

4. Improving recipe ingredient input: separate in multiple fields and allow more
   than 6 ingredients.

5. Shopping list feature: button on recipe to add ingredients to a list.

6. Weekly meal planning feature: assign recipes to the next 7 days and show
   on a weekly calendar.

7. Nutrition data on each ingredient from spoonacular API (https://
   spoonacular.com/food-api) and calculate total calories of recipe.

## Thanks to!

This app was created as part of [Jonas Smechmann](https://twitter.com/jonasschmedtman)'s Udemy course [The Complete JavaScript Course 2023: From Zero to Expert!](https://www.udemy.com/course/the-complete-javascript-course/).

Special thanks to Jonas for his excellent teaching and guidance throughout the course.

## Show your support

Give a ⭐️ if you liked this project!

## License

This project is [MIT](https://github.com/RohitPatel1122/forkify-app/blob/master/LICENSE) licensed.
