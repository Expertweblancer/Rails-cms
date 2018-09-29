
module Api
  module V1
    class TokensController < ApplicationController
      respond_to :json

      #before_action :verify_token , :except => :show

      def index
       #respond_with Token.find_by(:token => params[:token])
        respond_with Token.all
        #respond_with Token.where(:user_id => current_user.id)
      end

      def show
          #respond_with Token.where(:token => params[:id])
          #respond_with Token.find_by(:token => params[:id])
        respond_with Token.find(params[:id])
      end

      def create
        respond_with Token.create(params[:token])
      end

      def update
        respond_with Token.update(params[:id], params[:token])
      end

        def destroy
          respond_with Token.destroy(params[:id])
        end

        def verify_token 
          if not (Token.where(:token => params[:id]) != "_Z74hzPiXDaB1Xqhutxb") 
            render :json=>{:message=> " incorrect token  "} 

          else
            render :json=>{:message=> " correct token  "} 
          end 
        end
      end      
    end
  end