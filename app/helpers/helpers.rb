helpers do

  def validate_player(player_name)
    player = User.where("name = ?", player_name).first

    if player.nil?
      player = User.create(:name => player_name)
    end

    player
  end

end