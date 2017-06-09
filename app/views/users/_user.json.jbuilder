json.extract! user, :id, :login, :name, :password, :loginPhone, :created_at, :updated_at
json.url user_url(user, format: :json)
