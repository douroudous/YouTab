class SongsController < ApplicationController

  def index
    if params[:search]
      @songs = Song.search(params[:search]).order("created_at desc")
    else
      @songs = Song.all.order("created_at desc")
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

  def destroy
    @song = Song.find(params[:id])
    @artist = @song.artist
    @song.destroy
    redirect_to @artist
  end

  private

  def avg_rating(song)
    sum = song.reviews.sum("rating")
    count = song.reviews.length.to_f
    if count > 0
      (sum/count).round(1)
    else
      ""
    end
  end

  helper_method :avg_rating

end
