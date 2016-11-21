class AddFoundToPets < ActiveRecord::Migration[5.0]
  def change
    add_column :pets, :found, :boolean, default: false
  end
end
