class UsersController < ApplicationController

  def update
 
  end

  def show
    @user = User.find(params[:id])
  end
  
end
