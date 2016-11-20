class MessagesController < ApplicationController

  def create
    @pet = Pet.find(params[:pet_id])
    message_params = params.require(:message).permit(:body)
    @message = Message.new message_params
    @message.pet = @pet
    respond_to do |format|
      if @message.save
        format.js {render :create_success}
        format.html {redirect_to :back}
      else
        format.js {render :create_failure}
        format.html {redirect_to :back, alert: 'Could not create message'}
      end
    end
  end

  def destroy
    @message = Message.find params[:id]
    respond_to do |format|
      if @message.destroy
        format.html {redirect_to :back, notice: "Answer deleted!"}
        format.js {render}
      else
        format.html {redirect_to home_path, alert: 'access denied!'}
        format.js {render js: 'alert("access denied!")'}
      end
    end
  end
end
