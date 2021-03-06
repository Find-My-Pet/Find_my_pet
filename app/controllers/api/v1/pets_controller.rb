class Api::V1::PetsController < ApplicationController
  protect_from_forgery with: :null_session

  # this will get all the pets around user
  # def index
  #   @pets = Pet.order(created_at: :desc)
  # end
  #
  # def index
  #   lat = params[:user_lat].to_f
  #   lng = params[:user_lng].to_f
  #
  #   @pets = Pet.where(lat: (lat-0.01)..(lat+ 0.01)).where(long: (lng-0.01)..(lng+0.01))
  # end

  def index
    if params[:top].present?
      top = params[:top].to_f
      bottom = params[:bottom].to_f
      left = params[:left].to_f
      right = params[:right].to_f
      @pets = Pet.where(lat: (bottom)..(top)).where(long: (left)..(right))
    else
      @pets = Pet.order(created_at: :desc)
    end
  end

end
