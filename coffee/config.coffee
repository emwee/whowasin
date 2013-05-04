config = {api: {}}

production = yes

config.api.root = if production
  'http://api.ost.io'
else
  'http://localhost:8888/whowasin'

config.api.versionRoot = config.api.root + '/v1'

module.exports = config