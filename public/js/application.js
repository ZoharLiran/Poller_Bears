$(document).ready(function() {
  surveyApp = new SurveyApp();
  surveyApp.addListeners();
});

var SurveyApp = function() {
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
    $("#edit_survey_button").on("click", this.clickEditSurvey);
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
  },

  clickEditSurvey: function(event) { // method long, sorry, lazy
    if ($("#edit_survey_button").html() == "Edit survey") {
      $.each($(".question"), function(index, value) {
        var tempQuestion = $(value).html();
        var tempHtml = "<input class='edit_survey' type='text' placeholder='question' name='questions[" + index + "]' value='" + tempQuestion + "'>";
        $(value).html(tempHtml);
      });
      $("#edit_survey_button").html("Submit edit");
    } else if ($("#edit_survey_button").html() == "Submit edit") {
      params = {
        title: "",
        questions: {}
      };
      params.title = $("#title").html();
      $.each($(".edit_survey"), function(index, value) {
        params.questions[index.toString()] = $(value).val();
      });
      // send put request to update survey
      $("#edit_survey_button").html("Edit survey");
      var pathArr = window.location.pathname.split("/");
      var surveyId = pathArr[pathArr.length - 1];
      $.ajax({
        url: "/surveys/" + surveyId,
        type: "put",
        data: params
      }).done(function(data) {
        $.each($(".question"), function(index, value) {
          var question = $("input[name='questions[" + index.toString() + "]']");
          $(value).html(question.val());
        });
      }).fail(function(data) {
        console.log("fail");
      });
    }
  }

};