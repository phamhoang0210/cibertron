FROM duongtv/ruby-node-gaia:1.0.4
ENV MYSQL_PWD gaia_test
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
RUN apt-get update && apt-get install libmysqlclient-dev mysql-server -y
RUN mv /home/rails/node/node_modules ./home/rails/gaia/node_modules
COPY package.json package-lock.json yarn.lock ./
RUN yarn install --modules-folder ./home/rails/gaia/node_modules
ADD . /home/rails/gaia
WORKDIR /home/rails/gaia
RUN cd /home/rails/gaia
RUN bundle install --without development test --deployment
RUN NODE_ENV=production rails assets:precompile
RUN chmod 777 /home/rails/gaia && chmod 777 /home/rails/gaia/gaia.sh
RUN mkdir -p /var/log/unicorn && mkdir -p /home/unicorn/pids
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
CMD /home/rails/gaia/gaia.sh