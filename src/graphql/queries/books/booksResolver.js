let books = [
    {
        name: "Black tower",
        author: "Stephen King",
        description: "Hyvä fantasia kirja sarja",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Tulevaisuuden varjossa",
        author: "Erkki Tuomioja",
        releaseYear: "2021",
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
]

module.exports = {
    Query: {
        bookCount: () => books.length,
        allBooks: () => books,
        findBook: (root, args) =>
            books.find(b => b.name === args.name)
    }
}

