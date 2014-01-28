if (Meteor.isClient) {
  Meteor.startup(function () {
    console.log("Red stapler client started");
  });  
  
  Template.officelist.offices = function () {
    return Offices.find({}, {sort: {name: 1}});
  };

  Template.officelist.selected_name = function () {
    var office = Offices.findOne(Session.get("selected_office"));
    return office && office.name;
  };

  Template.office.selected = function () {
    return Session.equals("selected_office", this._id) ? "selected" : '';
  };

  Template.officelist.events({
    'click input.inc': function () {
      Offices.update(Session.get("selected_office"), {$inc: {score: 5}});
    }
  });

  Template.office.events({
    'click': function () {
      Session.set("selected_office", this._id);
    }
  });
}