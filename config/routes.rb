Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/dashboard')
  resources :dashboard, only: [:index]
  resources :auth, only: [:index] do
    collection do
      get 'sign_in', to: 'auth#sign_in'
      get 'sign_up', to: 'auth#sign_up'
      get 'sign_out', to: 'auth#sign_out'
    end
  end

  namespace :cronus do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :channels
      option.resources :categories
      option.resources :providers
      option.resources :nodes
      option.resources :campaigns
    end
  end

  namespace :userservice do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :departments
      option.resources :accounts
    end
  end

  namespace :sol do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :promos
    end
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      with_options only: [:index, :show, :create, :update, :destroy] do |option|
        option.resources :service_infos
      end
    end
  end
end
