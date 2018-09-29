module Api
  module V1
    class UsersController < ApplicationController
      respond_to :json
      
      #http_basic_authenticate_with name: 'user', password: '1234'

      def index
       respond_with User.all
      end

      def show
        #if not Token.find_by(:user_id => params[:id] , :token => params[:token]) #&& Token.find_by(:token => params[:token])
         #   render :json=> {:message=>" INCORRECT ID OR TOKEN "}
         # else
           respond_with User.find_by(:id =>params[:id] )
          #  respond_with User.all
        #end
      end

      def create
        #respond_with User.create(params[:project])
       # respond_with User.create(:email => params[:email], :first_name => params[:first_name],
       #  :last_name=>params[:last_name],
       #  :researcher=>params[:researcher],
       #  :investor=>params[:investor],
       #  :encrypted_password=>params[:encrypted_password],
       #  :reset_password_token=>params[:reset_password_token]
       #   )
      end

      def update
        respond_with User.update(params[:id] ,
         :email => params[:email], 
         :first_name =>params[:first_name] , 
         :last_name =>params[:last_name] ,
         :university =>params[:university] ,
          :department=>params[:department] ,
          :interests=>params[:interests] ,
          :encrypted_password =>params[:encrypted_password],
          :reset_password_token => params[:reset_password_token]
           )
      end

      def destroy
        respond_with User.destroy(params[:id])
      end


      #def authentication_token
       # authenticate_or_request_with_http_token do |token, options|
        #  User.all(params[:auth_token])
        #end
      #end

   
    end
  end
end
