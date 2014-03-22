helpers do
  def current_user
    User.find(session[:id]) if session[:id]
  end

  def logged_in?
    session[:user_id] != nil ? true : false
  end
end
