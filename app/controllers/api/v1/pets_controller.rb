class Api::V1::PetsController < ApplicationController
  protect_from_forgery with: :null_session
  
  # this will get all the pets around user
  def index
    @pets = Pet.order(created_at: :desc)
  end

end
