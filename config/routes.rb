Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/dashboard')
  health_check_routes

  resources :dashboard, only: [:index]
  resources :auth, only: [:index] do
    collection do
      get 'sign_in', to: 'auth#sign_in'
      get 'sign_up', to: 'auth#sign_up'
      get 'sign_out', to: 'auth#sign_out'
    end
  end

  namespace :authservice do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :departments
      option.resources :accounts
      option.resources :companies
      option.resources :roles
      option.resources :users
    end
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      with_options only: [:index, :show, :create, :update, :destroy] do |option|
        option.resources :service_infos
      end
    end
  end

  resources :apps, path: '/', only: [] do
    collection do

      get ':code/*path', to: 'apps#index'
      get ':code', to: 'apps#index'
    end
  end
end
