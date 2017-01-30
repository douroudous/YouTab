class AddUserToSong < ActiveRecord::Migration
  def up
    add_column :songs, :user_id, :string, null: false
  end

  def down
    remove_column :songs, :user_id
  end
end
