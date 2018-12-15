# Connect 4 - Multiplayer
I have been started to code in React 2 weeks ago, and I thought so much about which project I have to start with, and then I just started to code a simple connect4 program, the simplest you can ever imagine, with single player (you're actually playing with yourself, and you always win!).
And then I thought how can I make the project more amazing, with more features, and BTW I wanted to learn as much as possible about React.
So, here we go.

## Server Side
For getting the proper server side - click [here](https://github.com/Tamir-Chrome/Connect4Server)

## Table of contents
 1. How to start
 2. Features
 3. Covered holes
 4. Problems we didn't had time (or power) to cover

### How to start
Firstly, you have to clone the repositry, by running the following code in your folder
`git clone https://github.com/omerb124/Connect4`

For installing the needed modules, run the following command:
`npm install`

And then, for start the program, run:
`npm start`

### Features

 - Rooms
	 - Room List
	 - Creating room
		 - Each player chose name and color
	 - Joining room (by unique url or by room list)
	 - 'Joining and Viewing random room' Button
- Game
	- Well designed board
	- Playing with keyboard (space + arrows)
	- Results table
	- Viewers (endless amount of viewers)

### Covered holes

 - Rooms
	 - Joining unexist room
	 - Joining closed room (game ended)
	 - Joining to active room
	 - Viewing unexist/closed room
- Game
	- Start a game with the same colors
	- One player has closed the game tab
	- Full board 

### Problems we didn't had time (or power) to cover
Actually, the whole problems are in the server-side, so take a look at its docs.
 - 
