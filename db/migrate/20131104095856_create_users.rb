class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, :unique => true, :null => false
      t.timestamps
    end
  end
end
