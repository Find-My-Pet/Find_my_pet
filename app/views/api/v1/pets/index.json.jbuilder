json.array! @pets do |pet|
  json.id pet.id
  json.name pet.name
  json.created_at pet.created_at
  json.lat pet.lat
  json.lng pet.long
  json.breed pet.breed
end
