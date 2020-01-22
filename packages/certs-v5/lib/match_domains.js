'use strict';
const _ = require('lodash')

function splitDomains(domains) {
  return domains.map(domain => {
    return [domain.substring(0, 1), domain.substring(1)]
  })
}

module.exports = function (cert_domains, app_domains) {
  let matchedDomains = cert_domains.map(cert_domain => {
    return app_domains.filter(app_domain => {
      return app_domain.hostname.includes(cert_domain.substring(1))
    });
  })

  matchedDomains = _.uniq(_.flatten(matchedDomains))

  return matchedDomains
}
