mongo -- "$MONGO_INITDB_DATABASE" <<EOF
db.createUser({
  user: '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [
    {
      role: 'readWrite',
      db: '$MONGO_INITDB_DATABASE'
    }
  ]
})
db.createCollection("todos"),
db.todos.insertMany([
  {
      _id: "7DsgByqRBw5iDFZLmD4VD6",
      description: "Sortir les poubelles"
  },
  {
      _id: "kWb7Q1qwXLjzuLrLc9iUFQ",
      description: "Préparer le déjeuner"
  }
])
EOF

