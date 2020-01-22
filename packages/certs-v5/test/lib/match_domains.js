'use strict'
const expect = require('chai').expect
const matchDomains = require('../../lib/match_domains')

describe('matchDomains', () => {
  it('matches a single domain', () => {
    const certDomains = ['www.foobar.com']
    const appDomains = [{hostname: 'www.foobar.com', id: 123}]

    expect(matchDomains(certDomains, appDomains)).to.deep.eq([{hostname: 'www.foobar.com', id: 123}])
  })

  it('matches app domains with wildcard certs', () => {
    const certDomains = ['*.purple.com']
    const appDomains = [{hostname: 'www.foobar.com', id: 123}, {hostname: 'www.purple.com', id: 246}, {hostname: 'app.purple.com', id: 369}]

    expect(matchDomains(certDomains, appDomains)).to.deep.eq([{hostname: 'www.purple.com', id: 246}, {hostname: 'app.purple.com', id: 369}])
  })

  it('matches app domains with multiple wildcard certs', () => {
    const certDomains = ['*.purple.com', '*.foobar.com']
    const appDomains = [{hostname: 'www.foobar.com', id: 123}, {hostname: 'www.purple.com', id: 246}, {hostname: 'app.purple.com', id: 369}]

    expect(matchDomains(certDomains, appDomains)).to.deep.eq([{hostname: 'www.purple.com', id: 246}, {hostname: 'app.purple.com', id: 369}, {hostname: 'www.foobar.com', id: 123}])
  })

  it('matches app domains with SAN certs', () => {
    const certDomains = ['www.purple.com', 'www.foobar.com']
    const appDomains = [{hostname: 'www.foobar.com', id: 123}, {hostname: 'www.purple.com', id: 246}, {hostname: 'app.purple.com', id: 369}]

    expect(matchDomains(certDomains, appDomains)).to.deep.eq([{hostname: 'www.purple.com', id: 246}, {hostname: 'www.foobar.com', id: 123}])
  })

  it('returns a blank array when nothing matches', () => {
    const certDomains = ['www.foobar.com']
    const appDomains = [{hostname: 'www.purple.com', id: 123}]

    expect(matchDomains(certDomains, appDomains)).to.deep.eq([])
  })
})
