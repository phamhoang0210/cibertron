FROM starefossen/ruby-node:2-8
ENV MYSQL_PWD gaia_test
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
RUN apt-get update && apt-get install mysql-server -y
COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test --deployment --binstubs --path=/home/rails/bundle
ADD . /home/rails/gaia
WORKDIR /home/rails/gaia
RUN cd /home/rails/gaia
ENV NODE_OPTIONS --max_old_space_size=4096
RUN yarn install
RUN rails assets:precompile
RUN mkdir -p /var/log/unicorn && mkdir -p /home/unicorn/pids && chmod -R 777 /home/rails/gaia
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
CMD /home/rails/gaia/gaia.sh