let notes = [
    {
        title: "Hae ruoka",
        text: "osta omenoita ja kahvia",
        id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        title: "Hyvä blogikirjoitus",
        text: "Käsittelee ohjelmointia",
        url: "www.jokuosoite.com",
        important: true,
        id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
        title: "Vie roskat",
        important: false,
        id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]

module.exports = {
    Query: {
        notesCount: () => notes.length,
        allNotes: () => notes,
        findNote: (root, args) =>
            notes.find(n => n.title === args.title)
    }
}

