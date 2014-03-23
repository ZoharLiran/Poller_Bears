helpers do
  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    session[:user_id] != nil ? true : false
  end
end
