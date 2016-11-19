class ChangeColumnNameOnPets < ActiveRecord::Migration[5.0]
  def change
    remove_column :pets, :type
    add_column :pets, :pet_type, :string
  end
end
