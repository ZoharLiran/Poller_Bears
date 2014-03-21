get '/' do 
  redirect "/surveys"
end

post '/sessions' do #login an existing user
 @user = User.find_by_email(params[:email])
  if @user.password == params[:password]
    session[:user_id] = @user.id 
  end
  redirect "/surveys"
end 

post '/users' do #create a new user
  @user = User.new(params[:user])
  @user.password = params[:password]
  @user.save!
end

get '/surveys' do #home page

end

get '/surveys/:id' do #take specific survey

end

post '/surveys/:id' do #post data from specific survey

end

get '/surveys/:id/results' do 

end

get '/surveys/new' do #go to the page to create a new survey

end

post '/surveys' do #create the new survey 

end

get '/surveys/:id/edit' do #edit a specific survey

end

post '/surveys' do #Goes back to main surveys

end