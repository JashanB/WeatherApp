class UsersController < ApplicationController
  def show
    puts "params!!! #{params}"
    user_id = params[:id]
    puts "params!!! #{user_id}"
    @places = Place.where(user_id: user_id)
    render :json => {
      places: @places
    }
  end

  def create
  end

end
