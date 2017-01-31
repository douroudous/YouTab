class Api::V1::SongsController < ApplicationController

  def show
    @song = Song.find(params[:id])
    render :json => { :title => @song.title,
                      :artist => @song.artist.name,
                      :tab => @song.tab.split(";") }
  end

  def update
    @song = Song.find(params[:id])
    @song.tab = JSON.parse(request.body.read)["tab"]
    @song.save
    render json: @song
  end

end
