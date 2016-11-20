class ChangeSightingsTypeCloumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :sightings, :type, :pet_type
  end
end
