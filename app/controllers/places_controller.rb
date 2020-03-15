class PlacesController < ApplicationController
  def create
    @place = Place.new(add_place_params)
    @place.save
    render :json => {
        place: @place
      }
  end

  private
  def add_place_params
    params.require(:place).permit(:name, :latitude, :longitude)
  end
end
