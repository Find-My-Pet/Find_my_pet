class ChangeColumnTypeForPets < ActiveRecord::Migration[5.0]
  def change
    change_column :pets, :last_seen_date, :date
    change_column :pets, :last_seen_time, :time
  end
end
