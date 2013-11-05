$(document).ready(function() {
  // console.log("JS running!")

  //Player Constructor
  function Player(identifier, symbol, position, keyCode) {
    this.identifier = identifier;
    this.symbol = symbol;
    this.position = position;
    this.keyCode = keyCode;
  }

  // Update the position of this player on the board and increment
  // their position counter.
  Player.prototype.updatePosition = function() {
    player_position_selector = this.identifier+"_position"
    var initial_position = $("."+player_position_selector);
    var new_position = $(initial_position.next());

    new_position.addClass(player_position_selector);
    initial_position.removeClass(player_position_selector);

    initial_position.text("|");
    new_position.append(this.getSymbol());

    this.position++;
  }

  // Get the appropriate symbol to represent this player on the board.
  Player.prototype.getSymbol = function() {
    return this.symbol
  }

  // Return true if this player has won, return false otherwise.
  Player.prototype.isVictorious = function() {
    if(this.position >= 30) {
      return true;
    }

    return false;
  }

  // Get the identifier of this player
  Player.prototype.getIdentifier = function() {
    return this.identifier;
  }

  // Get the keyCode used to increment this player's position.
  Player.prototype.getKeyCode = function() {
    return this.keyCode;
  }

  // Game Constructor
  function Game(player_1, player_2) {
    this.player_1 = new Player("player_1", "a", 0, 81);
    this.player_2 = new Player("player_2", "b", 0, 80);
    this.finished = false;
  }

  // End the game, storing the time that it ended.
  Game.prototype.setFinished = function() {
    this.endTime = new Date();
    this.finished = true;
  }

  Game.prototype.isFinished = function() {
    return this.finished;
  }

  // Return the number of seconds the game was played.
  Game.prototype.secondsPlayed = function() {
    var timeDiff = this.endTime - this.startTime;

        // Remove milliseconds
        var timeDiff = timeDiff / 1000;

        // Get seconds
        var seconds = Math.round(timeDiff % 60);

        return seconds;
      }

  // Handle the keyUp event appropriately for each player.
  Game.prototype.onKeyUp = function(keyCode)  {
    if (keyCode == this.player_1.getKeyCode()) {
      this.player_1.updatePosition();
    }
    else if (keyCode == this.player_2.getKeyCode()){
      this.player_2.updatePosition();
    }
  }

  // Send the data about the game to the server via AJAX.
  Game.prototype.postToServer = function(winnerIdentifier, secondsPlayed)  {
   $.post("/game", {
     winner: winnerIdentifier, time_played: secondsPlayed
   }, function() {
     window.location = "/"
   });
 }

  // Run the game.
  Game.prototype.run = function() {
    this.startTime = new Date();
    thisGame = this;

    $(document).on('keyup', function(event) {
      if (!thisGame.isFinished()) { // Ensure that players cannot move or post to server if the game is already over and a post is in progress.
        thisGame.onKeyUp(event.which);



        if(thisGame.player_1.isVictorious()) {
          thisGame.setFinished();

          var winningPlayer = thisGame.player_1.getIdentifier();
          var timePlayed = thisGame.secondsPlayed();

          thisGame.postToServer(winningPlayer, timePlayed);
        }
        else if (thisGame.player_2.isVictorious()) {
          thisGame.setFinished();

          var winningPlayer = thisGame.player_2.getIdentifier();
          var timePlayed = thisGame.secondsPlayed();

          thisGame.postToServer(winningPlayer, timePlayed);
        }
      }
    });
  }

  var game = new Game();
  game.run();
});