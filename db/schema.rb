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

ActiveRecord::Schema.define(version: 20170916024935) do

  create_table "service_infos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "internal_name"
    t.string "avatar_url"
    t.text "description"
    t.string "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "company_id"
    t.integer "department_id"
    t.integer "user_id"
    t.index ["company_id"], name: "index_service_infos_on_company_id"
    t.index ["department_id"], name: "index_service_infos_on_department_id"
    t.index ["user_id"], name: "index_service_infos_on_user_id"
  end

end
