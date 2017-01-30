class Review < ActiveRecord::Base

  belongs_to :song
  belongs_to :user

  validates :rating, presence: true, numericality: { only_integer: true}, inclusion: { in: 1..5, message: "must be between 1 - 5"}
  validates :song, presence: true

end
