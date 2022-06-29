const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = require('graphql')
const {projects, clients} = require('../sampleData')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
})

//get client by id
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return clients.find(client => client.id === args.id)
            }
        }
    }
})

//export our root query
module.exports = new GraphQLSchema({
    query: RootQuery
})