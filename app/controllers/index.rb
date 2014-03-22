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
  if @user
    session[:user_id] = @user.id
    return true
  end
  return false
end

before '/users/*' do
  if !session[:user_id]
    redirect '/'
  end
end

get '/users/:id/surveys' do
  current_user = User.find(params[:id])
  @surveys = current_user.surveys
  erb :surveys
end

get '/surveys' do #home page
  @surveys = Survey.all
  erb :surveys
end

get '/surveys/new' do #go to the page to create a new survey
  erb :new_survey
end

get '/surveys/:id' do #take specific survey
  @survey = Survey.find(params[:id])
  @questions = @survey.questions
  erb :survey
end


post '/surveys/:id' do #post data from specific survey
  p params
  answers = params[:answers] #{question_id=>answer, 2=>answer, etc...}
  #first user (id=1) is 'anonymous'
  user_id = session[:user_id] ? session[:user_id] : 1
  answers.each_pair{|key,value|
    current_question = Question.find(key)
    current_question.choices.create(user_id: user_id, choice: value)
  }
  redirect "/surveys/#{params[:id]}/results"
end

get '/surveys/:id/results' do
  @results = {}
  current_survey = Survey.find(params[:id])
  questions = current_survey.questions
  questions.each_with_index do |question, index|
    question_id = question.id
    @results[index] = question.answers_distribution
  end
  @results[:title] = current_survey.title
  erb :results
end


#pass params[:questions] that will be {1=>"the first question", 2=>"second question", etc}
#pass params[:title]

post '/surveys' do #create the new survey
  current_user = User.find(session[:user_id])
  current_survey = current_user.surveys.create(params[:survey_title])
  params[:questions].each_value{|value|
    current_survey.questions.create(content: value)
  }
  redirect "/users/#{current_user.id}/surveys"
end

get '/surveys/:id/edit' do #edit a specific survey
  @survey = Survey.find(params[:id])
  @questions = @survey.questions
  erb :edit_survey
end

put '/surveys' do #Goes back to main surveys UPDATE Survey

end



delete '/sessions' do
  session.clear
  return true
end