<div align="center">
  <h1 align="center">Gotta Graduate!</h3>
  
<!--     <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->
  [![Production Build and Deploy](https://github.com/SmartControllerJS/l4-project-interactive-game/actions/workflows/production.yml/badge.svg?branch=main)](https://github.com/SmartControllerJS/l4-project-interactive-game/actions/workflows/production.yml)
    [![Develop Build and Deploy](https://github.com/SmartControllerJS/l4-project-interactive-game/actions/workflows/develop.yml/badge.svg?branch=develop)](https://github.com/SmartControllerJS/l4-project-interactive-game/actions/workflows/develop.yml)
  <p align="center">
    Gotta Graduate! is a multiplayer co-op game where you and your friends go through the lifecycle of university avoiding the casual, nonsensical hiccups that university life brings while also trying to pass each year, with the hopes of graduating. Avoid dropping out of university and ace your exams with your classmates.
    <br />
    <a href="https://fraser-dempster.github.io/l4-project-interactive-game/">View The Game »</strong></a>
  </p>
</div>

The project is hosted on Github Pages:
- Production version here: `https://fraser-dempster.github.io/l4-project-interactive-game/`
- Development version here: `https://fraser-dempster.github.io/l4-project-interactive-game-develop/`

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#motivation-of-project">Motivation of project</a></li>
        <li><a href="#aim-of-project">Aim of project</a></li>
        <li><a href="#technologies">Technologies</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
      </ul>
    </li>
    <li>
      <a href="#how-to-run-the-code-locally">How to run the code locally</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>

</details>

## About the project
Level 4 individual project: Interactive experiences for public spaces using smartphone remote controllers for user interaction [HTML, JavaScript, Smartphone, HCI].

I am creating an interactive game for a new university building being opened in 2022 called the Advanced Research Centre (ARC). The game will be available to play in public, outside the ARC, on a screen facing the street. A user will scan a QR code which will connect to their mobile phone and open a controller which they can use to play the game.

### Motivation of project
The motivation for this project is to explore how the use of a smartphone controller can create an interactive experience in a public context. Within this context, the users of the experience could be of any age, background, and career. This creates specific constraints that aren't present when the experience is a more typical, targeted indoor interactive experience.

The project revolves around the creation of a multiplayer game which will allow the users to interact and play with each other. It will allow for an engaging experience with no barrier of entry and hopefully let a wide audience take advantage of the experience. 

### Aim of project
The main aim of the project is to build an interactive game that takes advantage of the smartcontroller in a public environment. The game will allow users to scan a QR code and play the game with friends, acting as a catalyst for communication and engagement. 

Initially, the project was focused on building a generic game, but as development continued, a specific focus has been placed on making the game student friendly.
### Technologies

* [Phaser](https://phaser.io/)
  * Phaser is a 2D game framework used for making HTML5 games for desktop and mobile
* [Node.js](https://nodejs.org/en/)
  * JavaScript runtime environment that allows you run JavaScript code outside of the web browser
* [Tiled](https://www.mapeditor.org/)
  * Tiled is a free and open source, easy to use, and flexible level editor
* [Webpack.js](https://webpack.js.org/)
  * Webpack is a free and open-source module bundler for JavaScript.
* [Figma](https://www.figma.com/)
  * Figma is a vector graphics editor and prototyping tool which is primarily web-based, with additional offline features enabled by desktop applications for macOS and Windows.
* [GitHub Actions](https://github.com/features/actions)
  * GitHub Actions is a continuous integration and continuous development (CI/CD) platform that makes it easier to build, test, and deploy your code.
* [GitHub Pages](https://pages.github.com/)
  * GitHub Pages is a free, static site hosting service which directly integrates with GitHub repositories.

### Roadmap
- [x] Game map
  - [x] Find tileset
  - [x] Decide on map layout
  - [x] Make graphics
  - [x] Integrate into Phaser
- [x] Add sprites
  - [x] Get spritesheet
  - [x] Integrate spritesheet into Phaser
  - [x] Add Phaser properties to Sprite
  - [x] Add map collision for sprites
  - [x] Add temporary movement with keys
  - [x] Add health bar
  - [Not Done] Add player name
- [x] Round 1
  - [x] Create items
    - [x] Facebook
    - [x] TikTok
    - [x] Beer
    - [x] Instagram
    - [x] Youtube
    - [x] Netflix
    - [x] Add item collision on players and map boundary
    - [x] Add random spawn points to items
    - [x] Good item
  - [x] Add countdown timer
  - [x] Add QRCode
  - [x] Add smartcontroller Movement
  - [x] Add instructions before playing
  - [x] Add START area
  - [x] Add score screen
    - [x] Transfer score data across
    - [x] Create UI for screen
    - [x] Create highscore
    - [x] Add automatic end reload
    - [x] Add character sprites 

## How to run the code locally
**Pre-requisite Installs**
* [Node.js](https://nodejs.org/en/) is required to build and run the website.
  * Make sure **Node** and **NPM** are installed

1. Clone the repository
    * run commmand `git clone https://github.com/SmartControllerJS/GottaGraduate.git`
    * Navigate to directory containing project
2. Install dependencies
    * `npm install`
3. Run the code locally
    * `npm run dev`
4. Create a build if required, this step is optional
    * `npm run build`

## Contact

[![LinkedIN](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/fraser-dempster-0470641ba/)
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/fraser-dempster)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:fraserdempster23@gmail.com)


