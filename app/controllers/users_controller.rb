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
    @place = Place.new(add_place_params)
    @place.save
  end

  private
  def add_place_params
    params.require(:place).permit(:name, :latitude, :longitude)
  end
end
