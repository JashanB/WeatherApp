# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Data ..."

puts "Creating points ..."

Place.destroy_all
User.destroy_all

User.create(id: 1, email: "a@a")
Place.create(id: 1, name: "Houston", latitude: 29.7604267, longitude: -95.3698028, user_id: 1)
Place.create(id: 2,name: "Seattle", latitude: 47.6062095, longitude: 122.3320708, user_id: 1)



