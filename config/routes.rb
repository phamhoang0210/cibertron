Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/dashboard')
  health_check_routes

  resources :minerva, only: [:index]
  # resources :nami, path: '/namivn', only: [:index]

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
      option.resources :campaign_bydates
      option.resources :leads
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

  namespace :userservice do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :users
    end
  end

  namespace :sol do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :discounts
      option.resources :catalogs
      option.resources :group_catalogs
      option.resources :promos
      option.resources :courses
      option.resources :combos
      option.resources :targets
      option.resources :prizes
    end
  end

  namespace :captain do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit, :delete] do |option|
      option.resources :campaigns
    end
  end

  namespace :nauh do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :leads do
        collection do
          get 'assign', to: 'leads#assign'
          get 'report', to: 'leads#report'
        end
      end
      option.resources :orders
      option.resources :sources
      option.resources :prices
      option.namespace :settings do
        resources :ipphones
      end
    end
  end

  namespace :ees do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :campaigns
      option.resources :lists
      option.resources :templates
      option.resources :senders
      option.resources :logs
    end
  end

  namespace :hera do
    root to: 'dashboard#index'
    with_options only: [:index, :new, :edit] do |option|
      option.resources :landing_pages do
        member do
          get 'get_code', to: 'landing_pages#get_code'
        end
      end
      option.resources :domains
      option.resources :budgets
    end
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      with_options only: [:index, :show, :create, :update, :destroy] do |option|
        option.resources :service_infos
      end
    end
  end

  namespace :internal, defaults: { format: :json } do
    namespace :v01 do
      with_options only: [:index, :show] do |option|
        option.resources :front_components
      end
    end
  end

  resources :apps, path: '/', only: [] do
    collection do
      get 'myaccount/*path', to: 'apps#myaccount'
      get 'myaccount', to: 'apps#myaccount'

      get ':code/*path', to: 'apps#index'
      get ':code', to: 'apps#index'
    end
  end
end
