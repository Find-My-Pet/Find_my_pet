class ChangeLongituteAndLatitudeColumnTypes < ActiveRecord::Migration[5.0]
  def change
    remove_column :pets, :lat
    remove_column :pets, :long
    add_column :pets, :lat, :float
    add_column :pets, :long, :float

    remove_column :sightings, :lat
    remove_column :sightings, :long
    add_column :sightings, :lat, :float
    add_column :sightings, :long, :float
  end
end
