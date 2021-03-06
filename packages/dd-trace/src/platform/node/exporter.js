'use strict'

const AgentExporter = require('../../exporters/agent')
const LogExporter = require('../../exporters/log')
const env = require('./env')
const exporters = require('../../../../../ext/exporters')
const version = require('../../../lib/version')

module.exports = name => {
  const inAWSLambda = env('AWS_LAMBDA_FUNCTION_NAME') !== undefined
  const isBeta = /^\d+\.\d+\.\d+-beta\.\d+$/.test(version) // TODO: remove when GA

  switch (name) {
    case exporters.LOG:
      return LogExporter
    case exporters.AGENT:
      return AgentExporter
    default:
      return inAWSLambda && isBeta ? LogExporter : AgentExporter
  }
}
