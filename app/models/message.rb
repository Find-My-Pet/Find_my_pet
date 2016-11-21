class Message < ApplicationRecord
  belongs_to :pet
  validates :body, presence: :true
end
