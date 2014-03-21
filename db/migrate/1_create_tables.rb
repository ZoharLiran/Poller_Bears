class CreateTables < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      t.string :name
      t.string :password_hash
      t.string :email
    end

    create_table(:surveys) do |t|
      t.string  :title
      t.belongs_to :user 
    end

    create_table(:questions) do |t|
      t.belongs_to :survey 
      t.text :content
    end

    create_table(:choices) do |t|
      t.belongs_to :user 
      t.belongs_to :question 
      t.integer :choice 
    end
  end

  
end
