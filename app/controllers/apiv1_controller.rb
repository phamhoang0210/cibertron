class Apiv1Controller < ApplicationController
 include Pundit
  include Pureapi::Controller
  include Jwtauth::Controller
  # require include Pundit
  include Jwtauth::Apiv01Controller
end
