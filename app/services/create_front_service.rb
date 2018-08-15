class CreateFrontService
  # Define constants
  FRONT_COMPONENT_ATTR = [:name, :title, :source_code, :description]
  FRONT_COMPONENT_INSTANCE_ATTR = [:code, :version, :front_component_id, :url_publish]
  FRONT_COMPONENT_DIST_ATTR = [:name, :file_url, :front_component_instance_id]

  attr_reader :data
  attr_reader :mode

  def initialize data, mode = nil
    @data = data
    @mode = mode
  end

  def perform
    _component = @data

    if _component.is_a?(Hash)
      _component = _component.inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}

      component = FrontComponent.find_by(name: _component[:name])
      attrs = _component.slice(*FRONT_COMPONENT_ATTR)

      if component
        component.assign_attributes(attrs)

        if component.save
          perform_instance(component, _component[:front_component_instances])
        else
          puts component.errors.full_messages
        end

      else
        component = FrontComponent.new(attrs)

        if component.save
          perform_instance(component, _component[:front_component_instances])
        else
          puts component.errors.full_messages
        end
      end

      component
    end
  end

  def perform_instance component, data
    if data.is_a?(Array)
      _instances = {}
      component.front_component_instances.map{|i| _instances[i.code] = i}
      _instance_codes = _instances.map{|k, v| k}

      instances = {}
      data.map{|i| instances[i[:code]] = i}
      instance_codes = instances.map{|k, v| k}

      # 1. create
      (instance_codes - _instance_codes).each do |code|
        attrs = instances[code].slice(*FRONT_COMPONENT_INSTANCE_ATTR)
        instance = FrontComponentInstance.new(attrs)
        instance.front_component = component

        if instance.save
          perform_dist(instance, instances[code][:front_component_dists])
        else
          puts instance.errors.full_messages
        end
      end

      # 2. update
      (instance_codes & _instance_codes).each do |code|
        attrs = instances[code].slice(*FRONT_COMPONENT_INSTANCE_ATTR)
        instance = _instances[code]
        instance.assign_attributes(attrs)

        if instance.save
          perform_dist(instance, instances[code][:front_component_dists])
        else
          puts instance.errors.full_messages
        end
      end

      # 3. remove
      (@mode == 'remove') && (_instance_codes - instance_codes).each do |code|
        _instances[code].destroy
      end
    end
  end

  def perform_dist instance, data
    if data.is_a?(Array)
      _dists = {}
      instance.front_component_dists.map{|i| _dists[i.name] = i}
      _dist_names = _dists.map{|k, v| k}

      dists = {}
      data.map{|i| dists[i[:name]] = i}
      dist_names = dists.map{|k, v| k}

      # 1. create
      (dist_names - _dist_names).each do |name|
        attrs = dists[name].slice(*FRONT_COMPONENT_DIST_ATTR)
        dist = FrontComponentDist.new(attrs)
        dist.front_component_instance = instance

        if !dist.save
          puts dist.errors.full_messages
        end
      end

      # 2. update
      (dist_names & _dist_names).each do |name|
        attrs = dists[name].slice(*FRONT_COMPONENT_DIST_ATTR)
        dist = _dists[name]
        dist.assign_attributes(attrs)

        if !dist.save
          puts dist.errors.full_messages
        end
      end

      # 3. remove
      (@mode == 'remove') && (_dist_names - dist_names).each do |name|
        _dists[name].destroy
      end
    end
  end
end
