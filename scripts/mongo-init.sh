#!/bin/sh
# https://stackoverflow.com/questions/63088368/mongdb-authentication-not-able-to-create-user-using-docker-ignoring-docker-entr

mongo --eval "
  db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');
  db = db.getSiblingDB('$MONGODB_DB_MAIN');
  db.createUser(
    {
      user: '$MONGO_INITDB_DBUSER_USERNAME',
      pwd: '$MONGO_INITDB_DBUSER_PASSWORD',
      roles: [
        {
          role: 'readWrite', db: '$MONGODB_DB_MAIN'
        },
        {
          role: 'clusterMonitor', db: '$MONGO_INITDB_DATABASE'
        }
      ]
    }
  )

  db.getCollection('usermodel').insertOne({
    profile: {
      gender: '',
      location: '',
      picture: '',
      isChild: false,
      name: 'Nico'
    },
    mobile: '$MONGO_INITDB_APPUSER_MOBILE',
    tokens: [],
    email: '$MONGO_INITDB_APPUSER_USERNAME',
    password: '$MONGO_INITDB_APPUSER_PASSWORD'
  });
"
