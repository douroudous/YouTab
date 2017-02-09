class UsersController < ApplicationController

  def index
    @users = User.order(username: :asc)
    if params[:search]
      @users = User.search(params[:search]).order(username: :asc)
    else
      @users = User.order(username: :asc)
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to users_path
  end
end
