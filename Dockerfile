FROM duongtv/ruby-node-gaia:1.0.1
ADD . /home/rails/gaia
WORKDIR /home/rails/gaia
RUN apt-get update -qq && \
    cd /home/rails/gaia && \
    mkdir -p /var/log/unicorn && \
    mkdir -p /home/unicorn/pids && \
    mv /home/rails/node/node_modules /home/rails/gaia/node_modules && \
    bundle install --without development test --deployment --path=/home/rails/bundle && \
    yarn install && \
    export RAILS_ENV=production && \
    rails db:migrate && \
    rails assets:precompile
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
CMD ["unicorn", "-c", "config/unicorn.rb"]