class Pet < ApplicationRecord
  belongs_to :user
  validates :pet_type, presence: true
  validates :breed, presence: true
  validates :color, presence: true
  validates :gender, presence: true
  validates :last_seen_at, presence: true

  mount_uploader :image, ImageUploader

end
