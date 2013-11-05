class NumPlayersValidator < ActiveModel::Validator
  def validate(record)
    if record.users.length != 2
      record.errors[:base] << "There must be exactly 2 Players."
    end
  end
end

class Game < ActiveRecord::Base
  # Remember to create a migration!
  validates_with NumPlayersValidator
  has_many :users_games
  has_many :users, :through => :users_games
end