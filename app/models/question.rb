class Question < ActiveRecord::Base
  has_many :choices
  has_many :users, through: :choices
  belongs_to :survey

  def answers_distribution
    choices = self.choices
    result =  [0, 0, 0, 0, 0]
    choices.each do |choice|
      result[choice.choice - 1] += 1
    end
    result
  end
end
