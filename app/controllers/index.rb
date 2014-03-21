get '/surveys' do #home page
  erb :index
end

get '/surveys/:id' do #take specific survey
  erb :survey
end

post '/surveys/:id' do #post data from specific survey

end

get '/surveys/:id/results' do
  erb :results
end

get '/surveys/new' do #go to the page to create a new survey
  erb :new_survey
end

post '/surveys' do #create the new survey

end

get '/surveys/:id/edit' do #edit a specific survey
  erb :edit_survey
end

post '/surveys' do #Goes back to main surveys

end