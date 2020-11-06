const request = require('supertest')
const app = require('../test_utils/testApp')
const mongoose = require('mongoose')
const FriendsModel = require('../../models/dbFriends')
const { UserModel } = require('../../models/dbUser')
const { dummyUsers, dummyToMe, dummyFromMe } = require('../test_utils/dummyUsers')

/**
 * @todo get from me requested user .. accepted
 * @todo get from me requested user .. rejected
 * @todo get to me requested user .. accepted
 * @todo get to me requested user .. rejected
 * @todo get users not requested
 * @todo get users with name kinnu for pagination
 */

