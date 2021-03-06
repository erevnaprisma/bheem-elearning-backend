const graphql = require('graphql')
const GraphQLLong = require('graphql-type-long')
const { RoleprivilegeType } = require('./type')
const { fetchAllRoleprivilegesByRoleId, fetchDetailRoleprivilege } = require('../services')

const {
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList
} = graphql

const getAllRoleprivilegesByRoleId = {
  type: new GraphQLObjectType({
    name: 'getAllRoleprivilegesByRoleId' + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      list_data: { type: GraphQLList(RoleprivilegeType) },
      count: { type: GraphQLLong },
      page_count: { type: GraphQLLong }
    })
  }),
  args: {
    page_size: { type: GraphQLInt },
    page_index: { type: GraphQLInt },
    role_id: { type: GraphQLString },
    string_to_search: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return fetchAllRoleprivilegesByRoleId(args, context)
  }
}
const getDetailRoleprivilege = {
  type: new GraphQLObjectType({
    name: 'getDetailRoleprivilege' + 'Response',
    fields: () => ({
      status: { type: GraphQLInt },
      error: { type: GraphQLString },
      data_detail: { type: RoleprivilegeType }
    })
  }),
  args: {
    id: { type: GraphQLString }
  },
  async resolve (parent, args, context) {
    return fetchDetailRoleprivilege(args, context)
  }
}

module.exports = {
  getAllRoleprivilegesByRoleId,
  getDetailRoleprivilege
}
