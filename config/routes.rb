Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/' => 'home#index', as: :home

  resources :users
  resources :sessions, only: [:destroy, :create, :new] do
    delete :destroy, on: :collection
  end

  resources :pets, shallow: true do
    get '/print' => 'pets#print'
    resources :sightings, only: [:new]
    resources :messages, only: [:create, :destroy]
  end

  resources :sightings


  get '/auth/facebook', as: :sign_in_with_facebook
  get '/auth/facebook/callback/' => 'callbacks#facebook'

  get '/auth/twitter', as: :sign_in_with_twitter
  get '/auth/twitter/callback/' => 'callbacks#twitter'


  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :pets, only:[:index, :show, :create, :new]
    end
  end

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :sightings, only:[:index, :show, :create, :new]
    end
  end

end
