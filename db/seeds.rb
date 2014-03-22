user = User.new(name: "Anonymous", email: "anon@example.com")
user.password = "1234"
user.save!

3.times do 
  user = User.new(name: Faker::Name.name, email: Faker::Internet.email)
  user.password = "1234"
  user.save!
end

(2..4).each do |i|
  user = User.find(i)
  6.times do 
    survey = user.surveys.create(title: Faker::Lorem.sentence)
    5.times do 
      question = survey.questions.create(content: Faker::Lorem.sentence + "?")
      6.times do 
        question.choices.create(choice: rand(5)+1)
      end
    end
  end
end


