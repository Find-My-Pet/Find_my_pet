class MessagesMailer < ApplicationMailer
  def message_pet_owner(message)
    @message   = message
    @pet = message.pet
    @user     = @pet.user
    if @user && @user.email
      mail(to: @user.email, subject: 'You got an sighting to your pet')
    end
  end
end
