class Pet < ApplicationRecord
  belongs_to :user
  has_many :messages, dependent: :destroy
  has_many :sightings, dependent: :destroy

  mount_uploader :image, ImageUploader
end
