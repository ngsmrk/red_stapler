// Set up a collection to contain office information. On the server,
// it is backed by a MongoDB collection named "offices".

Offices = new Meteor.Collection("offices");
// offices contain rows, rows contain desks, desk are occupied by people
