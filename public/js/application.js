$(document).ready(function() {
  surveyApp = new SurveyApp();
  surveyApp.addListeners();
});

//////////////////////////////////////////////////////////////////////
$("input[value='add_question']").on('click', function(){
  event.preventDefault;
  var title = $("input[name='title']").val();
  if (title!=null)
  {
    $("#survey_data").prepend("<p id='title'>"+title+"</p>");
    $("input[name='title']").remove()
  }
  var question = $("input[name='question']").val();
  {
    #("#survey_data").insertAfter("<p>"+question+"</p>")
  }
  // var questions = []
  // var question = $("input[name='question']").val();
  // questions.push(question)
  $.ajax({
    url: "/surveys",
    type: "POST",
    data: {title: title, question: question}
  })
})

//////////////////////////////////////////////////////////////////////


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