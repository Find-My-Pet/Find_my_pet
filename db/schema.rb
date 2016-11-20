# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161119203103) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.text     "body"
    t.integer  "pet_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pet_id"], name: "index_messages_on_pet_id", using: :btree
  end

  create_table "pets", force: :cascade do |t|
    t.string   "name"
    t.string   "breed"
    t.string   "color"
    t.string   "gender"
    t.string   "age"
    t.string   "last_seen_at"
    t.text     "note"
    t.string   "image"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.float    "lat"
    t.float    "long"
    t.string   "pet_type"
    t.string   "size"
    t.boolean  "found"
    t.datetime "last_seen_date"
    t.datetime "last_seen_time"
    t.index ["user_id"], name: "index_pets_on_user_id", using: :btree
  end

  create_table "sightings", force: :cascade do |t|
    t.string   "type"
    t.string   "last_seen_at"
    t.datetime "date_time"
    t.text     "note"
    t.string   "image"
    t.string   "name"
    t.string   "contact"
    t.integer  "pet_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.float    "lat"
    t.float    "long"
    t.index ["pet_id"], name: "index_sightings_on_pet_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "uid"
    t.string   "provider"
    t.string   "oauth_token"
    t.string   "oauth_secret"
    t.text     "oauth_raw_data"
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", using: :btree
  end

  add_foreign_key "messages", "pets"
  add_foreign_key "pets", "users"
  add_foreign_key "sightings", "pets"
end
