class Api::V1::PetsController < ApplicationController
  protect_from_forgery with: :null_session
  
  # this will get all the pets around user
  # def index
  #   @pets = Pet.order(created_at: :desc)
  # end
  # 
  def index
    lat = params[:user_lat].to_f
    lng = params[:user_lng].to_f
    
    @pets = Pet.where(lat: (lat-0.01)..(lat+ 0.01)).where(long: (lng-0.01)..(lng+0.01))
  end

end
