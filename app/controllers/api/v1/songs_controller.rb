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
    @song = Song.new(song_params)
    binding.pry
    # @song.artist = Artist.find(params[:artist_id])
    @song.user = current_user
    # if @song.version == 2
    #   @song.version = version
    # end
    if @song.save
      flash[:notice] =  "Tab added successfully"
      redirect_to song_path(@song)
    else
      flash.now[:notice] = @song.errors.full_messages
      render :new
    end
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

end
