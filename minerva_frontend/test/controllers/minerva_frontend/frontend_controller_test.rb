require 'test_helper'

module MinervaFrontend
  class FrontendControllerTest < ActionDispatch::IntegrationTest
    include Engine.routes.url_helpers

    test "should get index" do
      get frontend_index_url
      assert_response :success
    end

  end
end
