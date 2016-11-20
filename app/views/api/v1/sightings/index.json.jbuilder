json.array! @sightings do |sight|
  json.id sight.id
  json.id sight.name
  json.created_at sight.created_at
  json.lat sight.lat
  json.lng sight.long
end
