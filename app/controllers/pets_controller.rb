class PetsController < ApplicationController
  before_action :find_pet, only: [:edit, :update, :destroy, :show]
  before_action :set_defaults, only: [:edit, :new]

  def new
    @pet = Pet.new
  end

  def create
    # binding.pry
    @pet = Pet.new pet_params
    @pet.user = current_user
    if @pet.save
      redirect_to pet_path(@pet)
    else
      render :new
    end
  end

  def show
    @message = Message.new
  end

  def index
    @pets = Pet.order(created_at: :desc)
  end


  def edit
  end

  def update
    if @pet.update pet_params
      if @pet.tweet_this
        @pet.tweet_this = false
        client = Twitter::REST::Client.new do |config|
          config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
          config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
          config.access_token        = current_user.oauth_token
          config.access_token_secret = current_user.oauth_secret
        end
        client.update(social_message)
      elsif @pet.share_on_facebook
        @pet.share_on_facebook = false
        @graph = Koala::Facebook::API.new(current_user.oauth_token)
        @graph.put_connections("me", "feed", message: social_message)
      end
      redirect_to pet_path(@pet)
    else
      render :edit
    end
  end

  def destroy
    @pet.destroy
    redirect_to pets_path
  end

  def print
    render layout: "print"
  end

  private

  def set_defaults

    @pet_type = ['Dog', 'Cat', 'Bird', 'Guinea Pig', 'Hamster', 'Iguana', 'Snake', 'Other']

    @size = ['Small', 'Medium', 'Big']

    @gender = ['Male', 'Female']

  end

  def pet_params
    params.require(:pet).permit([:pet_type,
                                 :breed,
                                 :size,
                                 :name,
                                 :gender,
                                 :color,
                                 :age,
                                 :last_seen_at,
                                 :lat,
                                 :long,
                                 :found,
                                 :tweet_this,
                                 :share_on_facebook,
                                 :note,
                                 {image: []},
                                 :last_seen_date,
                                 :last_seen_time,
                                 :user_id])
  end

  def find_pet
    @pet = Pet.find params[:id]
  end

  def social_message
    "#{(@pet.found ? 'Found my pet' : 'Please help find my pet')} #{@pet.name}, it's a #{@pet.color} #{@pet.pet_type}, #{@pet.breed}, #{@pet.gender}, #{@pet.age}. #FindMyPet"
  end
end
