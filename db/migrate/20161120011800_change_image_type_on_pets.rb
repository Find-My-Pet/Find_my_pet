class ChangeImageTypeOnPets < ActiveRecord::Migration[5.0]
  def change
    remove_column :pets, :image, :json
    add_column :pets, :image, :string, array: true, default: []
  end
end
