module MinervaFrontend
  class Engine < ::Rails::Engine
    isolate_namespace MinervaFrontend
    config.assets.precompile += %w( bundle.js )
  end
end
