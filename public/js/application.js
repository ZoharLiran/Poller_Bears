$(document).ready(function() {
  surveyApp = new SurveyApp();
  surveyApp.addListeners();
});

var SurveyApp = function() {};

SurveyApp.prototype = {
  addListeners: function() {
    $('form[name="create_account"]').submit(surveyApp.clickSubmitSignup);
    $('form[name="login"]').submit(surveyApp.clickSubmitSignup);
  },

  clickSubmitSignup: function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: "/users",
      type: "POST",
      data: formData
    }).done(function(data) {
      $("#login_bar").hide("slow");
    }).fail(function(data, errorMsg) {
      alert("Signup Error");
    });
  },

  clickSubmitLogin: function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: "/sessions",
      type: "POST",
      data: formData
    }).done(function(data) {
      $("#login_bar").hide("slow");
    }).fail(function(data, errorMsg) {
      alert("Login Error");
    });
  }

};