json.extract! ticket, :id, :body, :service, :ipaddress, :contact, :contact_phone, :user_id, :employee_id, :massive, :created_at, :updated_at
json.url ticket_url(ticket, format: :json)
