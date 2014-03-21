$(document).ready(function() {
  surveyApp = new SurveyApp();
  surveyApp.addListeners();
  // $("#login_bar").
});

var SurveyApp = function() {};

SurveyApp.prototype = {
  addListeners: function() {
    $('form[name="create_account"]').submit(surveyApp.clickSubmitSignup);
    $('form[name="login"]').submit(surveyApp.clickSubmitLogin);
    $('#logout_bar').click(surveyApp.clickSubmitLogout);
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
      $("#logout_bar").show("slow");
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
      $("#logout_bar").show("slow");
    }).fail(function(data, errorMsg) {
      alert("Login Error");
    });
  },

  clickSubmitLogout: function(event) {
    $.ajax({
      url: "/sessions",
      type: "delete"
    }).done(function(data) {
      $("#logout_bar").hide("slow");
      $("#login_bar").show("slow");
    });
  }

};