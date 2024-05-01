import db from "./_db.js"

export const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(parent, args, context) {
            return db.games.find((game) => game.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(parent, args, context) {
            return db.authors.find((author) => author.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(parent, args, context) {
            return db.reviews.find((review) => review.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    }, 
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Review: {
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        }
    },

    Mutation: {
        deleteGame(parent, args) {
            return db.games.filter((game) => game.id !== args.id)
        },
        addGame(parent, args) {
            const game = {
                id: "100",
                ...args.game
            }
            db.games.push(game)
            return game
        },
        updateGame(parent, args) {
            console.log("🚀 ~ updateGame ~ args:", args)
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    console.log("🚀 ~ db.games=db.games.map ~ {...game, ...args.editGame}:", {...game, ...args.editGame})
                    return {...game, ...args.editGame}
                }
                return game
            })
            
            return db.games.find((game) => game.id === args.id)
        }
    }
}