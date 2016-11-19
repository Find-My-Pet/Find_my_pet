Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :sessions, only: [:destroy, :create, :new] do
    delete :destroy, on: :collection
  end

  resources :sightings, only: [:new, :create]

  get '/' => 'home#index', as: :home
  resources :pets
end
