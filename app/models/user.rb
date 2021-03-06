class User < ActiveRecord::Base
  has_many :choices
  has_many :questions, :through => :choices
  has_many :surveys

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password_hash, presence: true
  # users.password_hash in the database is a :string
  include BCrypt

  def password
   @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.login(params)
    user = User.find_by_email(params[:email])
    user.password == params[:password] ? user : nil
  end

end
