Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/dashboard')
  resources :dashboard, only: [:index]
  resources :auth, only: [:index] do
    collection do
      get 'sign_in', to: 'auth#sign_in'
      get 'sign_up', to: 'auth#sign_up'
    end
  end

  namespace :cronus do
    root to: 'dashboard#index'
    resources :channels, only: [:index, :new, :edit]
    resources :categories, only: [:index, :new, :edit]
    resources :providers, only: [:index, :new, :edit]
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      with_options only: [:index, :show, :create, :update, :destroy] do |option|
        option.resources :service_infos
      end
    end
  end
end
