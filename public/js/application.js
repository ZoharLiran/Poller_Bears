$(document).ready(function() {
  surveyApp = new SurveyApp();
  surveyApp.addListeners();
  // surveyApp.checkLoggedIn();
});

var SurveyApp = function() {
  // initialize
  $("#login_bar").hide();
  $("#logout_bar").hide();
  this.checkLoggedIn();
};

SurveyApp.prototype = {
  addListeners: function() {
    $('form[name="create_account"]').submit(surveyApp.clickSubmitSignup);
    $('form[name="login"]').submit(surveyApp.clickSubmitLogin);
    $('#logout_bar').click(surveyApp.clickSubmitLogout);
  },

  checkLoggedIn: function() {
    $.ajax({
      url: "/sessions",
      type: "GET"
    }).done(function(data) {
      if (data == "true") {
        $("#logout_bar").show();
      } else if (data == "false") {
        $("#login_bar").show();
      }
    }).fail(function() {

    });
  },

  clickSubmitSignup: function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      url: "/users",
      type: "POST",
      data: formData
    }).done(function(data) {
      $("#login_bar").hide("fast");
      $("#logout_bar").show("fast");
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
      $("#login_bar").hide("fast");
      $("#logout_bar").show("fast");
    }).fail(function(data, errorMsg) {
      alert("Login Error");
    });
  },

  clickSubmitLogout: function(event) {
    $.ajax({
      url: "/sessions",
      type: "delete"
    }).done(function(data) {
      $("#logout_bar").hide("fast");
      $("#login_bar").show("fast");
    });
  }

};