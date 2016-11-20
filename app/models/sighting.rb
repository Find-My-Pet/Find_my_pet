class Sighting < ApplicationRecord
  belongs_to :pet
  validates :pet_type, presence: true
  validates :last_seen_at, presence: true
  validates :date_time, presence: true
  mount_uploader :image, ImageUploader
end
