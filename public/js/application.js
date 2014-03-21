$(document).ready(function() {
  $('form[name="create_account"]').submit(function(event) {
    event.preventDefault();
    var form_data = $(this).serialize();

    $.ajax({
      url: "/users",
      type: "POST",
      data: form_data
    }).done(function(data) {
      if (data == true)
      console.log(data);
      // todo: check data for valid response
      $("#login_bar").hide("slow");
    });
  });
});
