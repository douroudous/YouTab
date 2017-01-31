class Api::V1::SongsController < ApplicationController
  #respond_to :json
  #do i need this?

  def show
    @song = Song.find(params[:id])
    render json: @song
  end

  def update
    @song = Song.find(params[:id])
    @song.update(params)
    #add more?
  end

end
