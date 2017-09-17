require 'pureapi/model'

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  include Jwtauth::Model

  class << self
    include Pureapi::Model
  end
end
