class AddRemake < ActiveRecord::Migration
  def up
    add_column :songs, :version, :integer, default: 1
  end

  def down
    remove_column :songs, :version
  end
end
