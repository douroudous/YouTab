Rails.application.routes.draw do
  devise_for :users
  root 'songs#index'

  resources :artists

  resources :songs do
    resources :reviews
  end
  resources :users, only: [:index, :show, :destroy]


end
