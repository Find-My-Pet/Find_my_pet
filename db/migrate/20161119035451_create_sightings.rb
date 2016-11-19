class CreateSightings < ActiveRecord::Migration[5.0]
  def change
    create_table :sightings do |t|
      t.string :type
      t.string :last_seen_at
      t.string :long
      t.string :lat
      t.datetime :date_time
      t.text :note
      t.string :image
      t.string :name
      t.string :contact
      t.references :pet, foreign_key: true

      t.timestamps
    end
  end
end
