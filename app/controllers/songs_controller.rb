class SongsController < ApplicationController

  def index
    if params[:search]
      @songs = Song.search(params[:search]).order("created_at asc")
    else
      @songs = Song.all.order("created_at asc")
    end
  end

  def show
    @song = Song.find(params[:id])
    @full_title = full_title(@song)
    @review = Review.new
    @reviews = @song.reviews
    @reviews = @reviews.order(created_at: :desc)
    @avg_rating = avg_rating(@song)
  end

  def new
    @song = Song.new
    @artist = Artist.find(params[:artist_id])
    @song_list = @artist.songs.map { |x| x.title }.uniq
  end

  def create
    @song = Song.new(song_params)
    @song.artist = Artist.find(params[:artist_id])
    @song.user = current_user
    if @song.version == 2
      @song.version = version
    end
    if @song.save
      flash[:notice] =  "Tab added successfully"
      redirect_to song_path(@song)
    else
      flash.now[:notice] = @song.errors.full_messages
      render :new
    end
  end

  def edit
    @song = Song.find(params[:id])
  end

  def update
    @song = Song.find(params[:id])
    if @song.update(song_params)
      flash[:notice] =  "Tab updated successfully"
      redirect_to song_path(@song)
    else
      flash.now[:notice] = @song.errors.full_messages
      render :edit
    end
  end

  def destroy
    @song = Song.find(params[:id])
    @song.destroy
    redirect_to songs_path
  end

  private

  def song_params
    params.require(:song).permit(:title, :artist_id, :version)
  end

  def avg_rating(song)
    sum = song.reviews.sum("rating")
    count = song.reviews.length.to_f
    if count > 0
      (sum/count).round(1)
    else
      "-"
    end
  end

  def version
    matches = Song.where(:title => @song.title)
    matches.sort_by { |song| song.version }.last.version + 1
  end



  helper_method :avg_rating

end
