class CallbacksController < ApplicationController
  def facebook
    data = request.env['omniauth.auth']
    user = User.find_from_oauth(data)
    user ||= User.create_from_oauth(data)
    if user.provider != data['provider']
      user.update_from_oauth(data)
    end
    session[:user_id] = user.id
    redirect_to home_path
  end

  def twitter
    data = request.env['omniauth.auth']
    user = User.find_from_oauth(data)
    user ||= User.create_from_oauth(data)
    if user.provider != data['provider']
      user.update_from_oauth(data)
    end
    session[:user_id] = user.id
    redirect_to home_path
  end
end
