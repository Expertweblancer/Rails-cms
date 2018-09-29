class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :reset_session
  protect_from_forgery with: :null_session

  before_filter :configure_permitted_parameters, if: :devise_controller?
  skip_before_filter :verify_authenticity_token
  before_action :set_cookies


  def set_cookies
    if user_signed_in?
          cookies[:user_id]    = current_user.id
          cookies[:first_name] = current_user.first_name
          cookies[:last_name]  = current_user.last_name
          #cookies[:email]      = current_user.email
    end
  end

  protected
  ## Add extra fields
  def configure_permitted_parameters

    devise_parameter_sanitizer.for(:sign_up) << :first_name
    devise_parameter_sanitizer.for(:account_update) << :first_name

    devise_parameter_sanitizer.for(:sign_up) << :last_name
    devise_parameter_sanitizer.for(:account_update) << :last_name


    devise_parameter_sanitizer.for(:sign_up) << :researcher
    devise_parameter_sanitizer.for(:account_update) << :researcher

    devise_parameter_sanitizer.for(:sign_up) << :investor
    devise_parameter_sanitizer.for(:account_update) << :investor

    devise_parameter_sanitizer.for(:sign_up) << :university
    devise_parameter_sanitizer.for(:account_update) << :university 

    devise_parameter_sanitizer.for(:sign_up) << :department
    devise_parameter_sanitizer.for(:account_update) << :department 

    devise_parameter_sanitizer.for(:sign_up) << :interests
    devise_parameter_sanitizer.for(:account_update) << :interests
    
    devise_parameter_sanitizer.for(:sign_up) << :avatar
    devise_parameter_sanitizer.for(:account_update) << :avatar           
  end
   private

# Overwriting the sign_out redirect path method
  def after_sign_out_path_for(resource_or_scope)
  main_path
  end
  
end
