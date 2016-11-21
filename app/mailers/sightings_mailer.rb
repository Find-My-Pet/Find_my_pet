class SightingsMailer < ApplicationMailer
  def notify_pet_owner(sighting)
    @sighting   = sighting
    @pet = sighting.pet
    @user     = @pet.user
    if @user && @user.email
      mail(to: @user.email, subject: 'You got an sighting to your pet')
    end
  end
end
