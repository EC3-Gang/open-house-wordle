# open-house-wordle

A Wordle clone in collaboration with the HCI(HS) Open House Team.

## TODOs
- We show them a 360 interactive picture within the game in HCI, and they would need to guess where the picture was taken.
- They would type out the answer from the answer bank (a campus map will be provided with the names of the locations)
  - If they get the question wrong, the distance between the correct location and the intended location will be shown on screen. 
  - When they get a question correct, they get +100 score, and when they get it wrong, they get -10 score per wrong guess. 
  - Each question has 5 tries to get it correct. 
    - If they still don't manage to input the answer correctly on the fifth guess, then they will skip to the next question.
- The quiz will have 10 questions in total, and at the end of the game, their total score will be added up and displayed on screen.

## Developing
You will need to have Node.js >= v17.0.0 installed on your machine (might work with 16.x.x, never tried).

### Clone the repo and setup some stuff
```sh
git clone https://github.com/EC3-Gang/open-house-wordle && cd open-house-wordle
yarn install
```

### Run the dev server
```sh
yarn start
```

### Lint with ESLint (Darren don't scream)
```sh
yarn lint
```

### Build the production version (note that you don't actually need to do this)
```sh
yarn build
```