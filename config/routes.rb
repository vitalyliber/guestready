Rails.application.routes.draw do
  root 'homes#index'
  get '*path', to: 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :properties
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
