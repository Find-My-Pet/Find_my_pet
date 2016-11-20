class Api::V1::PetsController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    @pets = Pet.order(created_at: :desc).limit(10)
    # render json: @pets.to_json
  end
end
