$(document).ready(function() {
  $('form[name="create_account"]').click(function(event) {
    event.preventDefault();
    var form_data = $(this).serialize();

    $.ajax({
      url: "/users",
      type: "POST",
      data: form_data
    }).done(function(data) {
      console.log(data);
    });
  });
});
