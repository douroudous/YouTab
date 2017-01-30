class Song < ActiveRecord::Base

  belongs_to :artist
  belongs_to :user
  has_many :reviews, dependent: :destroy

  validates :title, presence: true


end
