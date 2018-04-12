FROM starefossen/ruby-node:2-8
ENV MYSQL_PWD gaia_test
RUN echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections
RUN echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
RUN apt-get update && apt-get install mysql-server git -y
COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test --deployment --binstubs --path=/home/rails/bundle
ADD . /home/rails/gaia
ENV NODE_OPTIONS --max_old_space_size=16384
RUN mkdir /root/.ssh && \
    cp /home/rails/gaia/.ssh/id_rsa /root/.ssh && \
    touch /root/.ssh/known_hosts && \
    ssh-keyscan git.edumall.io >> /root/.ssh/known_hosts && \
    chmod -R 400 /root/.ssh
RUN git clone git@git.edumall.io:backend/minerva_frontend.git ./client/minerva_frontend && \
    cd /client/minerva_frontend && \
    npm install && \
    npm run build_production && \
    cp /client/minerva_frontend/src/bundle.js /home/rails/gaia/app/assets/javascripts/minerva
RUN git clone git@git.edumall.io:backend/nami_frontend.git ./client/nami_frontend && \
    cd /client/nami_frontend && \
    npm install && \
    npm run build:production && \
    cp /client/nami_frontend/app/dist/bundle.js /home/rails/gaia/app/assets/javascripts/nami && \
    cp /client/nami_frontend/app/dist/bundle.css /home/rails/gaia/app/assets/stylesheets/nami
WORKDIR /home/rails/gaia
RUN cd /home/rails/gaia
RUN yarn install && \
    rails assets:precompile && \
    mkdir -p /var/log/unicorn && \
    mkdir -p /home/unicorn/pids && \
    chmod -R 777 /home/rails/gaia
ENV RAILS_SERVE_STATIC_FILES true
ENV RAILS_LOG_TO_STDOUT true
ENV TZ Asia/Ho_Chi_Minh
CMD /home/rails/gaia/gaia.sh