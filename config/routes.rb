Rails.application.routes.draw do
  devise_for :users
  root 'songs#index'

  resources :artists

  resources :songs
  resources :users, only: [:index, :show, :destroy]


end
