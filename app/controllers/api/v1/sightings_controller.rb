class Api::V1::SightingsController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    pet = Pet.find params[:id]
    @sightings = pet.sightings
  end
end
