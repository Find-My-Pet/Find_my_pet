class CreatePets < ActiveRecord::Migration[5.0]
  def change
    create_table :pets do |t|
      t.string :type
      t.string :name
      t.string :breed
      t.string :color
      t.string :gender
      t.string :age
      t.string :last_seen_at
      t.string :lat
      t.string :long
      t.text :note
      t.string :image
      t.datetime :date_time
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
