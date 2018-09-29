module Api
  module V1
    class MembershipsController < ApplicationController
      respond_to :json

      def index
        #respond_with Membership.where(:user_id => current_user.id)

        respond_with Membership.all


        #respond_with  Membership.joins(:projects).where(:id => {:id => cookies[:user_id]  })
        #@Project=  Project.joins(:authorship).where(:authorship => {:user_id => cookies[:user_id]  })
        #respond_with @Project


      end

      def show
        respond_with Membership.all

        #respond_with Membership.find(params[:id])
        #if not Token.find_by(:user_id => params[:id] , :token => params[:token]) 
         # render :json=> {:message=>" INCORRECT ID OR TOKEN "}
        #else
        #respond_with  Membership.find_by(:user_id => params[:id])
        #end
      end

      def create
        respond_with Membership.create(:user_id => params[:user_id], :project_id=>params[:project_id] )
      end

      def update
        respond_with Membership.update(params[:id], params[:project])
      end

      def destroy
        respond_with Membership.destroy(params[:id])
      end

    end
  end
end
