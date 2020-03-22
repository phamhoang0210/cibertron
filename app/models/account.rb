require 'jwt'
# class Account
class Account < ApplicationRecord
  has_secure_password

  #validate email
  validates :email, presence: true
end
