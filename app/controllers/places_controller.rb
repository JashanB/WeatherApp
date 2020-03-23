class PlacesController < ApplicationController
  def index
    puts "params!!! #{params}"
    user_id = params[:id]
    puts "params!!! #{user_id}"
    @places = Place.where(user_id: user_id)
    render :json => {
      places: @places
    }
  end

  def show
    puts "params!!! #{params}"
    place_id = params[:id]
    puts "params!!! #{place_id}"
    @places = Place.where(id: place_id)
    render :json => {
      places: @places
    }
  end
  
  def destroy
    @place = Place.find_by(id: params[:id])
    @place.destroy
  end

  def create
    @place = Place.new(add_place_params)
    @place.save
    render :json => {
        place: @place
      }
  end

  private
  def add_place_params
    params.require(:place).permit(:name, :latitude, :longitude, :user_id)
  end
end
