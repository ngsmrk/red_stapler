if (Meteor.isClient) {
  Meteor.startup(function () {
    console.log("Red stapler client started");
  });  
  
  Template.leaderboard.players = function () {
    return Offices.find({}, {sort: {name: 1}});
  };

  Template.leaderboard.selected_name = function () {
    var player = Offices.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.leaderboard.events({
    'click input.inc': function () {
      Offices.update(Session.get("selected_player"), {$inc: {score: 5}});
    }
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}