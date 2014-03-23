get '/' do
  redirect "/surveys"
end

get '/sessions' do
  return logged_in?.to_s
end

post '/sessions' do #login an existing user
  user = User.login(params)
  if user
    session[:user_id] = user.id
    status 200
  else
    status 400
  end
end

post '/users' do #create a new user
  user = User.new(params[:user])
  user.password = params[:password]
  user.save!
  if user
    session[:user_id] = user.id
    status 200
  else
    status 400
  end
end

before '/users/*' do
  if !logged_in?
    redirect '/'
  end
end

get '/users/:id/surveys' do      # User Profile? List of user's created surveys?
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
  answers = params #{question_id=>answer, 2=>answer, etc...}
  #first user (id=1) is 'anonymous'
  user_id = session[:user_id] ? session[:user_id] : 1
  answers.each_pair{|key,value|
    current_question = key.to_i != 0 ? Question.find(key.to_i) : nil
    if current_question
      current_question.choices.create(user_id: user_id, choice: value)
    end
  }
  redirect "/surveys/#{params[:id]}/results"
end

get '/surveys/:id/results' do
  @results = []
  current_survey = Survey.find(params[:id])
  questions = current_survey.questions
  questions.each_with_index do |question, index|
    question_id = question.id
    @results << question.answers_distribution
  end
  @survey_title = current_survey.title
  erb :results
end

post '/surveys' do #create the new survey
  survey = Survey.new(title: params[:title])
  params[:questions].each { |question| survey.questions << Question.new(content: question) }
  survey.save!
  if survey
    current_user.surveys << survey
    redirect "/surveys/#{survey.id}"
  end
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
  status 200
end