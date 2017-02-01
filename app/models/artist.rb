class Artist < ActiveRecord::Base

  has_many :songs, dependent: :destroy
  validates :name, presence: true

  def self.search(search)
    where("name ILIKE ?", "%#{search}%")
  end

end
