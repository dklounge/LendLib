lists = new Meteor.Collection("Lists");

if (Meteor.isClient) {

  Template.categories.lists = function () {
    return lists.find({}, {sort: {category: 1}});
  };

  Session.set('adding_category', false);

  Template.categories.new_cat = function () {
    return Session.equals('adding_category', true);
  };

  Template.categories.events({
    'click #categories': function () {
      console.log('you clicked a category but nothing will happen');
    },
    'click #btnNewCat': function (e, t) {

      Session.set('adding_category', true);
      console.log('clicked button to add new category');

      Meteor.flush();
      focusText(t.find("#add-category"));
    },
    'keyup #add-category': function (e, t) {
      if (e.which === 13) {
        var catVal = String(e.target.value || "");
        if (catVal) {
          lists.insert({Category:catVal});
          Session.set('adding_category', false);
        }
      }
    },
    'focusout #add-category': function (e, t) {
      Session.set('adding_category', false);
    }
  });

  /** Generic Helper Functions**/
  // this function puts cursor where it should be
  function focusText(i) {
    i.focus();

    i.select();
  };

  Template.list.items = function () {
    if (Session.equals('current_list', null))
      return null;
    else {
      var cats = lists.findOne({_id:Session.get('current_list')});
      if (cats && cats.items) {
        for (var i = 0; i < cats.items.length; i++) {
          var d = cats.items[i];
          d.Lendee = d.LentTo ? d.LentTo : "free";
          d.LendClass = d.LentTo ? "label-important" : "label-success";
        }
        return cats.items;
      }
    }
  };

  Template.list.list_selected = function () {
    return ((Session.get('current_list') != null)
         && (!Session.equals('current_list', null)));
  };

  Template.list.list_status = function () {
    if (Session.equals('current_list', this._id))
      return "";
    else
      return " btn-inverse";
  };

  Template.list.lendee_adding = function () {
    return (Session.equals('list_adding', true));
  };

  Template.list.lendee_editing = function () {
    return (Session.equals('lendee_input', this.Name));
  };
} // Meteor.isClient ends

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
