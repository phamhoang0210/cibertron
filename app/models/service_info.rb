class ServiceInfo < ApplicationRecord
  module ForeignKeys
    COMPANY_ID = :company_id
    DEPARTMENT_ID = :department_id
    USER_ID = :user_id
  end
end