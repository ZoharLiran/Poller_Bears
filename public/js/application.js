$(document).ready(function() {
  surveyApp = new SurveyApp();
  surveyApp.addListeners();
});

var SurveyApp = function() {
  // initialize
  $("#login_bar").hide();
  $("#logout_bar").hide();
  this.showSidebar();
  this.questionCount = 1;
};

SurveyApp.prototype = {
  addListeners: function() {
    $("form[name='create_account']").on("submit", this.clickSubmitSignup);
    $("form[name='login']").on("submit", this.clickSubmitLogin);
    $("#logout_bar").on("click", this.clickSubmitLogout);
    $("#add_question").on("click", this.clickAddQuestion.bind(this);
  },

  showSidebar: function() {
    $.ajax({
      url: "/sessions",
      type: "GET"
    }).done(function(data) {
      if (data == "true") {
        $("#logout_bar").show();
      } else if (data == "false") {
        $("#login_bar").show();
      }
    }).fail(function(data, errorMsg) {
      console.log("Something weird happened in showing sidebar.")
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
  },

  clickAddQuestion: function(event) {
    event.preventDefault();
    questionHtml = "<input class='create_survey' type='text' placeholder='question' name='question" + this.questionCount.toString() + "'>";
    $("#questions_id").append(questionHtml);
    this.questionCount++;
  }

};