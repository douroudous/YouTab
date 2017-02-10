Rails.application.routes.draw do
  devise_for :users
  root 'songs#index'

  resources :songs, only: [:index, :show, :destroy] do
    resources :reviews, only: [:new, :create]
  end

  resources :artists
  resources :users, only: [:index, :show, :destroy]
  resources :reviews, only: [:edit, :update, :destroy]

  namespace :api do
    namespace :v1 do
      resources :songs, only: [:show, :update]
      resources :artists, only: [:show] do
        resources :songs, only: [:new, :create]
      end
    end
  end

  resources :interface, only: [:show]

  resources :entry, only: [:show]



end
