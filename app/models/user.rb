class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :songs, dependent: :destroy
  has_many :reviews, dependent: :destroy
  validates :username, presence: true
  validates :username, length: { maximum: 15 }
  validates :username, uniqueness: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end
