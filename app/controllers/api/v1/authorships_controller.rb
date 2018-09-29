module Api
  module V1
    class AuthorshipsController < ApplicationController
      respond_to :json

      def index
        #respond_with Authorship.where(:user_id => current_user.id)
         respond_with Authorship.all
      end

      def show
        respond_with Authorship.find(params[:id])
      end

      def create
        respond_with Authorship.create(params[:project])
      end

      def update
        respond_with Authorship.update(params[:id], params[:project])
      end

      def destroy
        respond_with Authorship.destroy(params[:id])
      end

    end
  end
end
