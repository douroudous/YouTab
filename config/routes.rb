Rails.application.routes.draw do
  devise_for :users
  root 'songs#index'

  resources :songs do
    resources :reviews, only: [:new, :create]
  end

  resources :artists
  resources :users, only: [:index, :show, :destroy]
  resources :reviews, only: [:edit, :update, :destroy]

  namespace :api do
    namespace :v1 do
      resources :songs, only: [:show, :update]
    end
  end

  resources :interface, only: [:show]


end
