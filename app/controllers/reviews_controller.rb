class ReviewsController < ApplicationController

  def new
    @review = Review.new
  end

  def create
    @review = Review.new(review_params)
    @review.user = current_user
    @review.song = Song.find(params[:song_id])
    if @review.save
      flash[:notice] =  "Review added successfully"
      redirect_to song_path(@review.song)
    else
      flash.now[:notice] = @review.errors.full_messages
      redirect_to song_path(@review.song)
    end
  end

  def edit
    @review = Review.find(params[:id])
  end

  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)
      flash[:notice] =  "Review updated successfully"
      redirect_to song_path(@review.song)
    else
      flash.now[:notice] = @review.errors.full_messages
      redirect_to song_path(@review.song)
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    redirect_to song_path(@review.song)
  end

  private

  def review_params
    params.require(:review).permit(:rating, :body)
  end

end
