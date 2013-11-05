enable :sessions

get '/' do
  # Look in app/views/index.erb
  erb :index
end

post '/' do
  session.clear
  player_1_name = params[:player1]
  player_2_name = params[:player2]

  player_1 = validate_player(player_1_name)
  player_2 = validate_player(player_2_name)

  #REMEMBER TO CLEAR THE SESSION WHEN GAME IS OVER
  session[:player_1] = player_1
  session[:player_2] = player_2
  # puts "Player 1 ID: " + session[:player_1_id].to_s
  # puts "Player 2 ID: " + session[:player_2_id].to_s
  redirect to '/game'
end

get '/game' do
  @game = Game.new

  # print "GAME INFO: "
  # p @game

  @game.users << session[:player_1]
  @game.users << session[:player_2]
  @game.save
  session[:game_id] = @game.id
  # puts "***SESSION GAME_ID IN GET ROUTE"
  # p session[:game_id]
  # print "GAME INFO: "
  # p @game

  erb :game
end

post '/game' do
  winner = session[params[:winner].to_sym]
  game = Game.where("id = ?", session[:game_id]).first

  # puts "***GAME***"
  # p game

  game.winner_id = winner.id
  #set elapsed time in seconds in the game
  game.finished = true
  game.time_played = params[:time_played]
  game.save
  puts "***GAME***"
  p game
end