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
      redirect_to pet_path(@pet)
    else
      render :edit
    end
  end

  def destroy
    @pet.destroy
    redirect_to pets_path
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
                                 :note,
                                 {image: []},
                                 :date_time,
                                 :user_id])
  end

  def find_pet
    @pet = Pet.find params[:id]
  end
end
