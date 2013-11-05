$(document).ready(function() {
  // console.log("JS running!")

  var startTime = new Date();

  var player_1_keypresses = 0;
  var player_2_keypresses = 0;

  $(document).on('keyup', function(event) {
    if(event.keyCode==81) {
      // console.log("pressed Q");
      var initial_player_1_position = $(".player_1_position");
      var new_player_1_position = $(initial_player_1_position.next());
      new_player_1_position.addClass("player_1_position");
      initial_player_1_position.removeClass("player_1_position");
      initial_player_1_position.text("|");
      new_player_1_position.append("a");

      player_1_keypresses++;

      if(player_1_keypresses >= 30) {
        alert("PLAYER 1 WINS!!!");
        var endTime = new Date();

        var timeDiff = endTime - startTime;

        // Remove milliseconds
        var timeDiff = timeDiff / 1000;

        // Get seconds
        var seconds = Math.round(timeDiff % 60);

        $.post("/game", { winner: "player_1", time_played: seconds }, function(){
          window.location = "/"
        });
      }
    }

    if(event.keyCode==80) {
      console.log("pressed P");
      var initial_player_2_position = $(".player_2_position");
      var new_player_2_position = $(initial_player_2_position.next());
      new_player_2_position.addClass("player_2_position");
      initial_player_2_position.removeClass("player_2_position");
      initial_player_2_position.text("|");
      new_player_2_position.append("b");

      player_2_keypresses++;

      if(player_2_keypresses >= 30) {
        alert("PLAYER 2 WINS!!!");

        var endTime = new Date();

        var timeDiff = endTime - startTime;

        // Remove milliseconds
        var timeDiff = timeDiff / 1000;

        // Get seconds
        var seconds = Math.round(timeDiff % 60);

        $.post("/game", { winner: "player_2", time_played: seconds }, function(){
          window.location = "/"
        });
      }
    }

  });

});
