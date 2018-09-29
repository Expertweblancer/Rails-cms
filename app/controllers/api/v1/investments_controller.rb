module Api
  module V1
    class InvestmentsController < ApplicationController
      respond_to :json

      def index
        #respond_with Investment.where(:id => current_user.id)
       respond_with Investment.all

        
        #respond_with  Membership.joins(:projects).where(:id => {:id => cookies[:user_id]  })
        #@Project=  Project.joins(:authorship).where(:authorship => {:user_id => cookies[:user_id]  })
        #respond_with @Project
        #respond_with Membership.joins(:project).where(:project => {:id => cookies[:user_id]})
        #respond_with  Membership.joins(:project).where(:user_id => cookies[:user_id] )
        #respond_with Project.where(:id => cookies[:project_id] & :user_id => cookies[:project_id] )
       # respond_with Project.find_by(:authors =>{ :id => "4"}  )
        # respond_with Project.where(:id => cookies[:project_id]  )


      end

      def show
        respond_with Investment.find(params[:id])
      end

      def create
        respond_with Investment.create(:user_id => params[:user_id], :project_id=>params[:project_id] )
      end

      def update
        respond_with Investment.update(params[:id], params[:project])
      end

      def destroy
        respond_with Investment.destroy(params[:id])
      end

    end
  end
end
