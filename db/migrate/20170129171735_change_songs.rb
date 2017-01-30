class ChangeSongs < ActiveRecord::Migration
  def up
    remove_column :songs, :artist
    add_column :songs, :artist_id, :integer, null: false

  end

  def down
    add_column :songs, :artist, :string, null: false
    remove_column :songs, :artist_id
  end
end
