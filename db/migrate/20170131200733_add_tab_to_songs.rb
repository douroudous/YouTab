class AddTabToSongs < ActiveRecord::Migration
  def up
    add_column :songs, :tab, :text, default: ""
  end

  def down
    remove_column :songs, :tab
  end
end
