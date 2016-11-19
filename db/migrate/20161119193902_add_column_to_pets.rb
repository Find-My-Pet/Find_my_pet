class AddColumnToPets < ActiveRecord::Migration[5.0]
  def change
    add_column :pets, :size, :string
    remove_column :pets, :date_time
    add_column :pets, :last_seen_date, :datetime
    add_column :pets, :last_seen_time, :datetime
  end
end
