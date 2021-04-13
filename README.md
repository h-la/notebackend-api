# GraphQL server
Api is using Apollo server

# queries & mutations

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

query ($noteToSearch: String!) {
  findNote(title: $noteToSearch) {
    title
    text
    url
    important
    id
  }
}

QUERY VARIABLES:
{"noteToSearch": "Hae ruoka"}
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