class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  ## Add a member to the project
  def add_member
    @project = Project.find(params[:id])
    @project.members << User.find(params[:user_id])
    redirect_to @project
  end

  ## Add an investor to the project
  def add_investor
    @project = Project.find(params[:id])
    @project.investors << User.find(params[:user_id])
    redirect_to @project
  end      

  # GET /projects
  def index
    @projects = Project.all

  end

  # GET /projects/1
  def show
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects
  def create

    @project = Project.new(project_params)
    @project.authors << current_user
    
    if @project.save
      render @project

    else
      render :new
    end
  end

  # PATCH/PUT /projects/1
  def update
    #if @project.update(project_params)
     # redirect_to @project
    #else
     # render :edit
    #end
  end

  def details
    if @project.find(:id)
      redirect_to @project
    else
    redirect_to projects_url
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    redirect_to projects_url
  end

  def viewopentrade

  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params[:project].permit(:title, :description)
    end

    
  
end
