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
} // Meteor.isClient ends

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
