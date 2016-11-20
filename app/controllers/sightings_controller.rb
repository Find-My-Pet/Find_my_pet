class SightingsController < ApplicationController

  before_action :set_defaults, only: [:new, :edit]
  before_action :find_sighting, only: [:show, :edit, :update, :destroy]

  def index
    @sightings = Sighting.order(created_at: :desc)
  end

  def new
    @sighting = Sighting.new
  end

  def create
    @sighting=Sighting.new sighting_params
    # if params[:pet_id].present?
      @sighting.pet_id = 1
      # params[:pet_id]
    # else
    #   @sighting.pet_id = nil
    # end
    if @sighting.save
      if @sighting.pet_id.present?
      SightingsMailer.notify_pet_owner(@sighting).deliver_now
      end
      # redirect_to post_path(@post)
      redirect_to sighting_path(@sighting)
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    if @sighting.update sighting_params
     redirect_to sighting_path(@sighting)
    else
      render :edit
    end
  end

  def destroy
    @sighting.destroy
    redirect_to sightings_path
  end

  private

  def set_defaults
    @pet_type = ['Dog', 'Cat', 'Bird', 'Guinea Pig', 'Hamster', 'Iguana', 'Snake', 'Other']

    @size = ['Small', 'Medium', 'Big']

    @gender = ['Male', 'Female']
  end

  def find_sighting
    @sighting = Sighting.find params[:id]
  end

  def sighting_params
    params.require(:sighting).permit([:pet_type, :last_seen_at, :date_time, :long, :lat, :note, :image, :name, :contact, :pet_id])
  end
end
