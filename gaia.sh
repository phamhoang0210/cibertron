cd /home/rails/gaia

export RAILS_ENV=production

rails db:migrate
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start db_migrate_process: $status"
  exit $status
fi

unicorn -c config/unicorn.rb
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start unicorn_process: $status"
  exit $status
fi

while /bin/true; do
  PROCESS_2_STATUS=$(ps aux |grep -q unicorn_process |grep -v grep)
  PROCESS_1_STATUS=$(ps aux |grep -q db_migrate_process | grep -v grep)
  if [ $PROCESS_1_STATUS -ne 0 -o $PROCESS_2_STATUS -ne 0 ]; then
    echo "One of the processes has already exited."
    exit -1
  fi
  sleep 60
done
