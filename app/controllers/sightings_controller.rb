class SightingsController < ApplicationController

before_action :set_defaults, only: [:new, :edit]

  def index
    @sightings = Sighting.order(created_at: :desc)
  end

  def show

  end

  def new
    @sighting = Sighting.new
  end

  def create
    sighting_params = params.require(:sighting).permit([:pet_type, :last_seen_at, :date_time, :long, :lat, :note, :image, :name, :contact, :pet_id])
    @sighting=Sighting.new sighting_params
    if params[:pet_id].present?
      @sighting.pet_id = params[:pet_id]
    else
      @sighting.pet_id = nil
    end
    if @sighting.save
      # redirect_to post_path(@post)
      redirect_to sighting_path(@sighting)
    else
      render :new
    end
  end

  def show
    @sighting = Sighting.find params[:id]
  end

  def edit
    @sighting = Sighting.find params[:id]
  end

  def update
    @sighting = Sighting.find params[:id]
    sighting_params = params.require(:sighting).permit([:pet_type, :last_seen_at, :date_time, :long, :lat, :note, :image, :name, :contact, :pet_id])
    if @sighting.update sighting_params
     redirect_to sighting_path(@sighting)
    else
      render :edit
    end
  end

  def destroy
    @sighting = Sighting.find params[:id]
    @sighting.destroy
    redirect_to sightings_path
  end

private
def set_defaults
  @pet_type = ['Dog', 'Cat', 'Bird', 'Guinea Pig', 'Hamster', 'Iguana', 'Snake', 'Other']

  @size = ['Small', 'Medium', 'Big']

  @gender = ['Male', 'Female']
end

end
