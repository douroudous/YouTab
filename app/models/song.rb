class Song < ActiveRecord::Base

  belongs_to :artist
  belongs_to :user
  validates :title, presence: true


end
