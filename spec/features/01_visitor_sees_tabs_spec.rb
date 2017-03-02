require 'rails_helper'

feature "visitor sees a list of songs" do
  scenario "sees a list of songs" do
    user = FactoryGirl.create(:user)
    artist = FactoryGirl.create(:artist)
    song = FactoryGirl.create(:song, user: user, artist: artist)

    visit root_path
#   click_button 'Sign In'
#
#     fill_in 'Email', with: user.email
#     fill_in 'user_password', with: user.password
#     click_button 'Sign In'
#
#     visit songs_path
#
#     expect(page).to have_content "Rush"
#     expect(page).to have_content "Tom Sawyer"
  end
end
