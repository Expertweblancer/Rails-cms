Rails.application.routes.draw do

  resources :investor
  #resources :investor
 # get 'investor' => 'investor#index'
  params = { controller: 'investor', action: 'index' }

  resources :investments
  resources :memberships
  resources :authorships
  resources :application

  devise_for :users

  resources :users, only: [:show ]
  #resources :users, defaults: {format: 'xml'} ,only: [:show , :index]
  #resources :users ,only: [:index]

  #Researcher
  get '/researcher-project' => 'projects#researcherViewProjects'
  get '/request' => 'projects#requestsByProject'
  get '/Researcher' => 'projects#mainResearcher'
  get '/edit-project/id*:id'=> 'projects#updateProject'

  #Investor
  # get '/investor-project' => 'projects#investorViewProjects'
  get '/viwe-request' => 'projects#viewRequests'
  get '/investor-account' => 'projects#viewAccount'
  get '/open-trades' => 'projects#viewOpenTrade'
  get '/trade-history' => 'projects#viewTradeHistory'
  get '/Investor' => 'projects#mainInvestor'
  
  #Researcher
  get '/editProject' => 'projects#edit'
  get '/new' => 'projects#new'
  get '/researcher_detail/id*:id' => 'projects#researchertDetail'

  #Investor
  get '/investor_detail/id*:id'=> 'projects#investor_projectDetail'

  #user
  get '/edit-profile/id*:id' => 'users#edit_profile'
  get 'user-logout' => 'devise/sessions#destroy'
  get 'registrations' => 'users#add'

  resources :projects do
    member do
      get :add_member
      get :add_investor
    end
  end
  
  # root 'home#index'
  root 'projects#main'
  get 'main' => 'projects#main'

  namespace :api, defaults: {format: 'json'} do
    # /api/... Api::
    namespace :v1 do
      resources :projects
      resources :users
      resources :investments
      resources :authorships
      resources :memberships
      resources :logins  ,:only => [:create] 
      resources :tokens
      resources :annotations
      resources :order_books
       end
  end

  get 'test' => 'projects#test'

#match ':controller(/:show(/:id(.:format)))' => 'projects#investor_projectDetail', via: [:get]

#match 'controller/do_it' => 'controller#do_it', :as => 'do_it'
  #get 'detail/:id', to: 'projects#show', as: 'detail'

end


