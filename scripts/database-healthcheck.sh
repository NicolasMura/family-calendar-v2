#!/bin/bash
# echo '1' | grep 1
# echo 'db.runCommand({serverStatus:1}).ok' | mongo --port $DB_PORT --authenticationDatabase $MONGODB_DB_MAIN -u $MONGO_INITDB_DBUSER_USERNAME -p $MONGO_INITDB_DBUSER_PASSWORD --quiet | grep 1
# echo 'db.runCommand({serverStatus:1}).ok' | mongo --port 28067 --authenticationDatabase 'family_calendar_db' -u 'family_calendar_db_user' -p 'nelsen-Bring-chopin-Quasi-7Cornstalk-Wispy3' --quiet | grep 1
# return 1

set -eo pipefail

host="$(hostname --ip-address || echo '127.0.0.1')"

if mongo "$host:$DB_PORT/$MONGODB_DB_MAIN" -u $MONGO_INITDB_DBUSER_USERNAME -p $MONGO_INITDB_DBUSER_PASSWORD --eval 'quit(db.getCollection("usermodel").find().count() ? 0 : 2)'; then
# if mongo "$host:$DB_PORT/$MONGODB_DB_MAIN" -u $MONGO_INITDB_DBUSER_USERNAME -p $MONGO_INITDB_DBUSER_PASSWORD --eval 'quit(db.runCommand({serverStatus:1}).ok ? 0 : 2)'; then
  exit 0
fi

exit 1