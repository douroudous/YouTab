FactoryGirl.define do
  factory :song do
    rating {rand(1..5)}
    sequence(:body) { |n| "body#{n}" }
    song
    user
  end
end
