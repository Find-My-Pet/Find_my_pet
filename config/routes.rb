Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :sessions, only: [:destroy, :create, :new] do
    delete :destroy, on: :collection
  end

  get '/' => 'home#index', as: :home
  resources :pets, shallow: true do
    resources :messages, only: [:create, :destroy]
  end

  get '/auth/facebook', as: :sign_in_with_facebook
  get '/auth/facebook/callbacks/' => 'callbacks#facebook'

  get '/auth/twitter', as: :sign_in_with_twitter
  get '/auth/twitter/callbacks/' => 'callbacks#twitter'
end
