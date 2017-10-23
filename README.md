# Pirate Storytime
Making up stories for children on the spot is both enjoyable and challenging.  This app allows you to store story ideas for later and share them with other users.  
Users can add ideas in five categories of story elements. They can choose to make these public or keep them private.  They can also search through the public cards and add them to their favorites.

## Built With

Mongo, Express, AngularJS, Node.js, Javascript, SweetAlert2, Angular Material and Filestack. 

## Getting Started

The first time you log in to Pirate Storytime it will generate cards for you from the pirateverse.  Later, you can go to settings and change the source to My Favorites or My Cards.

In the "Browse" section, you can add new cards and see them in the "My Cards" section.  You can browse and search the pirateverse for cards and add them to My Favorites.

### Prerequisites

- [Node.js](https://nodejs.org/en/)


### Installing

Run this command in the terminal:
npm install
npm start

Open a browser and go to:

localhost:5000

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] CRUD functionality for cards.
- [x] Authentication with Passport.
- [x] Add and remove cards to My Favorites from the Pirateverse (all user's cards).
- [x] Browse cards in three categories: "My Cards", "My Favorites", "Pirateverse".
- [x] Select which deck of cards to use for generating a story: "My Cards", "My Favorites", "Pirateverse".

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Ability to see and follow the favorites collections of other users.
- [ ] A card rating system based on the number of times a card is added to favorites.
- [ ] Search based on card rating.
- [ ] Flag a card as inappropriate.

## Author

Brendt Bly


## Acknowledgments

Thanks to Larry Price for making this Mongoose Schema plugin for finding random documents: 

[a link](https://github.com/larryprice/mongoose-simple-random)
