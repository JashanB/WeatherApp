Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'home#index'

  # resource :home, only: [:index]
  resource :home

  # namespace :api, defaults: { format: 'json' } do
  #   resources :users do
  #     resources :places
  #   end
  # end
  resources :users do
      resources :places
  end
  

  post '/weather/new' => 'weather#index'
  post '/weather/old' => 'weather#show'

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  

end
