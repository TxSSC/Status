(function() {

  var App = Ember.Application.create();

  App.User = Ember.Object.extend({
    firstName: function() {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }.property()
  });

  App.UsersController = Ember.ArrayController.create({
    content: [],

    loadUsers: function() {
      var self = this;

      $.ajax({
        url: 'http://dashboard.texasschoolsafetycenter.com:3003/users',
        dataType: 'json',
        success: function(data) {
          data = data.map(function(user) {
            return App.User.create({
              id: user._id,
              name: user.name,
              avatar: user.avatar,
              location: user.location
            });
          });

          self.set('content', data);
        }
      });
    }
  });

  App.MainView = Ember.View.extend({
    templateName: 'main'
  });

  App.UserView = Ember.View.extend({
    tagName: 'li',
    templateName: 'user',
    locationBinding: 'App.UsersController.content'
  });


  function bootUsers() {
    App.UsersController.loadUsers();

    return setInterval(function() {
      App.UsersController.loadUsers();
    }, 300000);
  }


  bootUsers();

  window.App = App;
  return App;

}).call(this);