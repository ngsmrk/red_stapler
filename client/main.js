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
            console.log("Selected office: " + Session.get("selected_office"));
            selected_office = Offices.findOne(Session.get("selected_office"));
            rows = selected_office.rows;
            rows.push({"number": rows.length + 1, desks: []});
            Offices.update(Session.get("selected_office"), {$set: {rows: rows}});
        },

        'click input.desk': function () {
            console.log("Selected office: " + Session.get("selected_office"));
            selected_office = Offices.findOne(Session.get("selected_office"));
            var rowNumber = document.getElementById('rowNumber').value;
            var occupant = document.getElementById('deskOccupant').value;
            console.log("Adding occupant: " + occupant + " to desk in row: " + rowNumber + " in office: " + selected_office._id);

            rows = selected_office.rows;
            row = rows[parseInt(rowNumber) - 1];

            desks = row.desks;
            desks.push({occupant: occupant});

            Offices.update(Session.get("selected_office"), {$set: {rows: rows}});
        }
    });

    Template.office.events({
        'click span.name': function () {
            console.log("Office click: " + this._id);
            Session.set("selected_office", this._id);
        }
    });
}
