# GraphQL server
Api is using Apollo server

# queries & mutations

# user
mutation addUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    username
    passwordHash
    id
  }
}

QUERY VARIABLES:
{
  "username": "jorma",  
	"password": "1234567890"
}
# ------------------

mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value   
  }
}

QUERY VARIABLES:
{
  "username": "jorma",  
	"password": "1234567890"
}

# notes
query {
  allNotes {
    title
    text
    url
    important
    id
  }
}
# ------------------

query {
  notesCount
}
# ------------------

query ($noteToSearch: ID!) {
  findNote(id: $noteToSearch) {
    title
    text
    url
    important
    id
  }
}

QUERY VARIABLES:
{"noteToSearch": "60757c63fd4c3c491419d5cf"}
# ------------------

mutation createNote(
  $title: String!
  $text: String
  $url: String
  $important: Boolean
) {
  addNote(title: $title, text: $text, url: $url, important: $important) {
    title
    text
    url
    important
    id
  }
}

QUERY VARIABLES:
{
  "title": "Siilien hoito",  
	"text": "Käsittelee sipuleita",
  "url": "www.jokuosoite.com",
  "important": true
}
# ------------------

mutation editNote(
  $id: ID!
  $title: String
  $text: String
  $url: String
  $important: Boolean
) {
  editNote(id: $id, title: $title, text: $text,  url: $url, important: $important) {
    title
    text
    url
    important
    id
  }
}

QUERY VARIABLES:
{
  "id": "3d594650-3436-11e9-bc57-8b80ba54c431",
  "title": "Ei haeta ruokaa",  
	"text": "Käsittele ruokaa",
  "url": "www.urli.com",
  "important": true
}
# ------------------

mutation deleteNote($id: ID!) {
   deleteNote(id: $id) 
}

QUERY VARIABLES:
{
  "id": "3d599470-3436-11e9-bc57-8b80ba54c431"
}
# ------------------