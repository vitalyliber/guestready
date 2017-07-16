Rails.application.routes.draw do
  root 'homes#index'

  namespace :api do
    namespace :v1 do
      resources :properties
    end
  end

  get '*path', to: 'homes#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
