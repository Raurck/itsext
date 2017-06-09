class JsonWebToken
    def self.encode(payload)
        JWT.encode(payload, Rails.application.secrets.secrets_key_base)
    end

    def self.decode(token)
        return HashWithIndidderentAccess.new(JWT.decode(token, Rails.application.secrets.secrets_key_base)[0])
    rescue
        nil
    end
end