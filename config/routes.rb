Rails.application.routes.draw do
  devise_for :users
  root 'songs#index'

  resources :artists

  resources :songs do
    resources :reviews, only: [:new, :create]
  end
  resources :users, only: [:index, :show, :destroy]

  resources :reviews, only: [:edit, :update, :destroy]

end
