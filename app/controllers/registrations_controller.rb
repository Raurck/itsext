class RegistrationsController < Devise::RegistrationsController

  private

  def sign_up_params
    params.require(:user).permit(:login, :name, :password, :password_confirmation, :loginPhone, :email, :current_password)
    #params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:login, :name, :password, :password_confirmation, :loginPhone, :email, :current_password)
    #params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
  end
end