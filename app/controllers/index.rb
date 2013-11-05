enable :sessions

get '/' do
  erb :index
end

post '/' do
  session.clear
  player_1_name = params[:player1]
  player_2_name = params[:player2]

  player_1 = validate_player(player_1_name)
  player_2 = validate_player(player_2_name)

  session[:player_1] = player_1
  session[:player_2] = player_2

  redirect to '/game'
end

get '/game' do
  @game = Game.new

  @game.users << session[:player_1]
  @game.users << session[:player_2]
  @game.save
  session[:game_id] = @game.id

  erb :game
end

post '/game' do
  winner = session[params[:winner].to_sym]
  game = Game.where("id = ?", session[:game_id]).first

  game.winner_id = winner.id
  game.finished = true
  game.time_played = params[:time_played]

  game.save
end