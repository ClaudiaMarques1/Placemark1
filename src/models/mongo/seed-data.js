export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  placemarks: {
    _model: "Placemark",
    dublin: {
      title: "Dublin Favourites",
      userid: "->users.bart"
    }
  },
  markers: {
    _model : "Marker",
    marker_1 : {
      title: "Favourite Restaurant",
      location: "McDonalds",
      date: "Sun Dec 12 2021",
      placemarkid: "->placemarks.dublin"
    },
  }
};
