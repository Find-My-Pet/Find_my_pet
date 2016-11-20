class Api::V1::SightingsController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    pet_param = params.require(:pet).permit(:id)
    pet = Pet.find_by_id(pet_param)
    @sightings = pet.sightings
    # @sightings = Sighting.order(created_at: :desc).limit(10)
  end
end
