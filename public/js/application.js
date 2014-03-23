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
    $("#add_question").on("click", this.clickAddQuestion.bind(this));
    $("#delete_survey").on("click", this.deleteSurvey)
  },

  deleteSurvey: function(event){
    event.preventDefault();
    var confirmation = confirm("Are you sure you want to delete this survey?");
    if (confirmation === true)
      {
        var survey_id = $("#survey_id").val()
        $.ajax({
          url:"/surveys/" + survey_id,
          type:"delete"
        }).done(function(){
          var user_id = $("#user_id").val()
          window.location.href = "/users/" + user_id + "/surveys";
          alert("The survey was successfully deleted !");
          })
      }
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
    $("#questions_id").append("<input class='create_survey' type='text' placeholder='question' name='questions[" + this.questionCount.toString() + "]'>");
    this.questionCount++;
  }

};