class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.boolean :finished
      t.integer :time_played
      t.integer :winner_id

      t.timestamps
    end
  end
end
