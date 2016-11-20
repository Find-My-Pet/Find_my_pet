Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :sessions, only: [:destroy, :create, :new] do
    delete :destroy, on: :collection
  end

  get '/' => 'home#index', as: :home

  get '/auth/facebook', as: :sign_in_with_facebook
  get '/auth/facebook/callbacks/' => 'callbacks#facebook'
  resources :pets
  
  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :pets, only:[:index, :show, :create, :new]
    end
  end

end
