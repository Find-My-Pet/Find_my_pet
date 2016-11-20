class Api::V1::PetsController < ApplicationController
  def index
    pets = Pet.order(created_at: :desc).limit(10)
    render json: questions.to_json
  end

end
