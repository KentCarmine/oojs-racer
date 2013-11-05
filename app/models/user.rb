class User < ActiveRecord::Base
  # Remember to create a migration!
  validates :name, :uniqueness => true
  has_many :users_games
  has_many :games, :through => :users_games
end
