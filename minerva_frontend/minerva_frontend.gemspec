$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "minerva_frontend/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "minerva_frontend"
  s.version     = MinervaFrontend::VERSION
  s.authors     = ["Nguyễn Nhật Minh Tú"]
  s.email       = ["tunnm@topica.edu.vn"]
  s.homepage    = ""
  s.summary     = "Summary of MinervaFrontend."
  s.description = "Description of MinervaFrontend."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.1.4"
end
