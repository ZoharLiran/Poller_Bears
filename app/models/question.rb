class Question < ActiveRecord::Base
  has_many :choices
  has_many :users, through: :choices
  belongs_to :survey

  def answers_distribution
    answers = self.choices
  end
end
