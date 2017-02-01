testuser1 = User.create(email: "test@gmail.com", username: "testuser7", password: "password")
testuser2 = User.create(email: "test2@gmail.com", username: "testuser1989", password: "password")
testuser3 = User.create(email: "test35@gmail.com", username: "testuser2000", password: "password")
adminuser = User.create(email: "admin@youtab.com", username: "adminuser", password: "password")

metallica = Artist.create(name: "Metallica")
sabbath = Artist.create(name: "Black Sabbath")
acdc = Artist.create(name: "AC/DC")

mop = Song.create(title: "Master of Puppets", artist: metallica, user: testuser1, tab: ",,9,9,7,0;,,,,,")
hth = Song.create(title: "Highway to Hell", artist: acdc, user: adminuser, tab: ",2,2,2,0,;,,,,,")
ironman = Song.create(title: "Iron Man", artist: sabbath, user: testuser2, tab: ",,,,9,7")
paranoid = Song.create(title: "Paranoid", artist: sabbath, user: testuser3, tab: ",,,,12,12")

Review.create(song: mop, user: adminuser, rating: 4, body: "Nice job")
Review.create(song: hth, user: testuser1, rating: 5, body: "Siiiiiiiiiiiick")
Review.create(song: ironman, user: testuser1, rating: 5, body: "Great!")
Review.create(song: ironman, user: testuser3, rating: 4, body: "Not bad")
Review.create(song: paranoid, user: testuser2, rating: 2, body: "Could use some work")
