class Api::V1::SongsController < ApplicationController

  def new
    @song = Song.new
    @artist = Artist.find(params[:artist_id])
    @song_list = @artist.songs.map { |x| x.title }.uniq
    render :json => { :artist => @artist.name,
                      :allSongs => @artist.songs,
                      :uniqueSongs => @song_list}
  end

  def create
    @song = Song.new
    @song.artist = Artist.find(params[:artist_id])
    @song.user = current_user
    song_info = JSON.parse(request.body.read)
    @song.title = song_info["title"]
    @song.tab = song_info["tab"] || ""
    if song_info["version"]
      @song.version = song_info["version"]
    else
      @song.version = version
    end
    @song.save
  end

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

  private

  def song_params
    params.require(:song).permit(:title, :artist_id, :version)
  end

  def version
    matches = Song.where(:title => @song.title)
    matches.sort_by { |song| song.version }.last.version + 1
  end

end
