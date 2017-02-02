class InterfaceController < ApplicationController

  def show
    @song = Song.find(params[:id])
    @class = params[:option]
  end

end
