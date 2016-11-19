class SightingsController < ApplicationController

  def new
    @sighting = Sighting.new
  end

  def create
    sighting_params = params.require(:sighting).permit([:type, :last_seen_at, :long, :lat, :date_time,:note, :image, :name, :contact])
    @sighting=Sighting.new sighting_params
    # @sighting.pet =
    if @sighting.save
      # redirect_to post_path(@post)
      render plain: 'created'
    else
      render :new
    end
  end
end
