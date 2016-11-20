json.array! @pets do |pet|
  json.id pet.id
  json.name pet.name
  # json.created_on question.created_at.strftime('%Y-%M-%D')
  json.lat pet.lat
  json.lng pet.long
  json.type pet.type
end
