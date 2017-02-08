class ArtistsController < ApplicationController

  def index
    if params[:search]
      @artists = Artist.search(params[:search]).order("name asc")
    else
      @artists = Artist.all.order("name asc")
    end
  end

  def show
    @artist = Artist.find(params[:id])
    @sorted_songs = @artist.songs.order("title asc")
  end

  def new
    @artist = Artist.new
  end

  def create
    @artist = Artist.new(artist_params)
    if @artist.save
      flash[:notice] =  "Artist added successfully"
      redirect_to artist_path(@artist)
    else
      flash.now[:notice] = @artist.errors.full_messages
      render :new
    end
  end

  def edit
    @artist = Artist.find(params[:id])
  end

  def update
    @artist = Artist.find(params[:id])
    if @artist.update(artist_params)
      flash[:notice] =  "Artist updated successfully"
      redirect_to artist_path(@artist)
    else
      flash.now[:notice] = @artist.errors.full_messages
      render :edit
    end
  end

  def destroy
    @artist = Artist.find(params[:id])
    @artist.destroy
    redirect_to artists_path
  end

  private

  def artist_params
    params.require(:artist).permit(:name)
  end

end
