class Question < ActiveRecord::Base
  has_many :choices
  has_many :users, through: :choices
  belongs_to :survey

  def answers_distribution
    answers = self.choices
    result = {1 => 0, 2=> 0, 3=> 0, 4=> 0, 5=> 0}
    answers.each do |answer|
      result[:answer.choice] += 1
    end
    result
  end
end
