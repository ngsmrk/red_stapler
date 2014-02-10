if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("Red stapler server started");
    if (Offices.find().count() === 0) {
      var names = ["Office 1", "Office 2"];
      for (var i = 0; i < names.length; i++)
        Offices.insert({name: names[i], rows: [{number: i, desks: [{occupant: 'Person 1'}, {occupant: 'Person 2'}]}]});
    }
  });
}
