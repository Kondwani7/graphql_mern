const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')
//const {projects, clients} = require('../sampleData')

const Project = require('../models/Project')
const Client = require('../models/Client')

//clients
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString}
    })
})
//projects
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        //project parent relationship
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
})
//get client by id
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find()
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Client.findById(args.id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find()
            }
        },
        project: {
            type: ProjectType,
            args : {id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id)
            }
        }
    }
})

//mutations
//these allow us to perform crud operations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLString},
                email: { type:GraphQLString },
                phone: { type: GraphQLString },
            },
            resolve(parent, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
            }
        }
    }
})


//export our root query
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})