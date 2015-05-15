Posts = new Mongo.Collection("posts");



if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    blogPosts: function () {
      return [
        {"author": "John Bravo", "title": "title no.1", "content": "This is a really cool blog post made with love!"},
        {"author": "Jane Austen", "title": "title no.2", "content": "This is a really cool blog post made with love!"}
      ];
    }
  });

  Template.body.events({
    "submit #new_blog_post_form": function (event) {
      // This function is called when the new task form is submitted
      console.log(event);
      //var text = event.target.text.value;
      var title   = $("#new_blog_post_title").val();
      var content = $("#new_blog_post_content").val();

      Posts.insert({
        title: title,
        createdAt: new Date(),
        content: content,
        owner: Meteor.userId(),           // _id of logged in user
        author: Meteor.user().username  // username of logged in user
      });
      // Clear form
      $("#new_blog_post_title").val("");
      $("#new_blog_post_content").val("");

      // Prevent default form submit
      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

  /*Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {$set: {checked: !this.checked}});
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
  });*/

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


