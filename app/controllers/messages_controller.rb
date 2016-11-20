class MessagesController < ApplicationController
  def create
    @pet = Pet.find(params[:pet_id])
    message_params = params.require(:message).permit(:body)
    @message = Message.new message_params
    @message.pet = @pet
    if @message.save
      redirect_to :back, notice: 'Message created'
    else
      flash.now[:alert] = 'Could not create message'
      redirect_to :back
    end
  end

  def destroy
    @message = Message.find params[:id]
    @message.destroy
    redirect_to :back
  end
end
