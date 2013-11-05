$(document).ready(function() {
  // console.log("JS running!")

  //Player Constructor
  function Player(identifier, position, keyCode) {
    this.identifier = identifier;
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
    if (this.identifier == "player_1") {
      return "a"
    }
    else if (this.identifier == "player_2") {
      return "b"
    }
    else {
      return "x"
    }
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
    this.player_1 = new Player("player_1", 0, 81);
    this.player_2 = new Player("player_2", 0, 80);
  }

  // End the game, storing the time that it ended.
  Game.prototype.setEndTime = function() {
    this.endTime = new Date();
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
    // console.log("in onKeyUp THIS is: " + this)
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

      thisGame.onKeyUp(event.which);



      if(thisGame.player_1.isVictorious()) {
        thisGame.setEndTime();

        var winningPlayer = thisGame.player_1.getIdentifier();
        var timePlayed = thisGame.secondsPlayed();

        thisGame.postToServer(winningPlayer, timePlayed);
      }
      else if (thisGame.player_2.isVictorious()) {
        thisGame.setEndTime();

        var winningPlayer = thisGame.player_2.getIdentifier();
        var timePlayed = thisGame.secondsPlayed();

        thisGame.postToServer(winningPlayer, timePlayed);
      }
    });
  }

  var game = new Game();
  game.run();
});