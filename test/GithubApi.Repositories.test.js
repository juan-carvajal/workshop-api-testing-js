const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('Repo Tests', () => {
  it('Consume GET Service', async () => {
    const response = await agent.get('https://api.github.com/users/aperdomob')
    //   .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.name).equal('Alejandro Perdomo');
    expect(response.body.company).equal('PSL');
    expect(response.body.location).equal('Colombia');
  });


  it('Search Repo', async () => {
    const query = {
      q: 'repo:aperdomob/jasmine-awesome-report'
    };
    let response = await agent.get('https://api.github.com/search/repositories').query(query)
    //   .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    expect(response.status).to.equal(statusCode.OK);
    const result = response.body.items[0];
    expect(result.full_name).to.equal('aperdomob/jasmine-awesome-report');
    expect(result.private).to.equal(false);
    expect(result.description).to.equal('An awesome html report for Jasmine');
    const downloadUrl = `${result.url}/zipball`;
    response = await agent.get(downloadUrl).set('User-Agent', 'agent');

  });
});
