module Api
  module V1
    class LoginsController < ApplicationController
      respond_to :json

      skip_before_filter :verify_authenticity_token
      def create
        email = params[:email]
        password = params[:password]


        if email.nil? or password.nil?
         render :json=>{:message=>"The request must contain the user email and password."}
         return
       end

       @user=User.find_by_email(email.downcase)

       if @user.nil?
        render :json=>{:message=>"Invalid email "}
        return
      end


      if not @user.valid_password?(password)
        render :json=>{:message=>"Invalid  password."}
      else

        @user.authentication_token =
        loop do 
          token = Devise.friendly_token
          break token unless User.find_by(authentication_token: token)
        end 

      #Time.now + 10.minutes
      #Time.now + 10.seconds

      Token.where("created_at <= ?", Time.now - 1.days).destroy_all

      if @token = Token.find_by(user_id: @user.id)
        render :json=>
        {
          :success=>true ,
          :token=>@user.authentication_token ,
            #:mod=>User.update(@user.id ,:authentication_token => @user.authentication_token),
            :TokenUpdate=>@token.update(user_id: @user.id ,:token =>@user.authentication_token ),
            :id => @user.id
          }
        end  

        if not Token.exists?(:user_id => @user.id)
          render :json=>
          { 
            :success=>true ,
            :token=>@user.authentication_token ,
            #:mod=>User.update(@user.id ,:authentication_token => @user.authentication_token),
            :TokenPost=>Token.create(:user_id => @user.id ,:token =>@user.authentication_token),
            :id => @user.id
          }    

        end  
      end
    end

  end 
end
end

