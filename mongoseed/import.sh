#!/bin/bash

mongoimport --host mongo-db --port 27017 --db simpletest --collection users --file /users.json
mongoimport --host mongo-db --port 27017 --db simpletest --collection results --file /results.json
mongoimport --host mongo-db --port 27017 --db simpletest --collection questions --file /questions.json