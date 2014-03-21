class User < ActiveRecord::Base
  has_many :choices
  has_many :questions, :through => :choices
  has_many :surveys

   # users.password_hash in the database is a :string
   include BCrypt

  def password
   @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

end