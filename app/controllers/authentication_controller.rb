class AuthenticationController < ApplicationController
  def authenticate_user
    user = User.find_for_database_authentication(email: params[:email])
    if user.valid_password?(params[:password])
      render json: payload(user)
    else
      render json: {errors: ['Invalid Username/Password: wrong p[assword']}, status: :unauthorized
    end
  rescue
    render json: {errors: ['Invalid Username/Password: not found']}, status: :unauthorized
  end

  private

  def payload(user)

    return nil unless user and user.id
    #make a hash with token data
    info = {name: user.name, 
      email: user.email,
      #it will be valid for 18 hours
      expires:(DateTime.now.to_time + 68400)  
    }
    #put token into hash and return
    info.merge!(access_token: JsonWebToken.encode(info))
  end
end