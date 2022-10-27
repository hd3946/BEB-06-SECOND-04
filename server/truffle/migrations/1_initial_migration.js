const FantasticToken = artifacts.require('FantasticToken')

module.exports = function (deployer) {
  deployer.deploy(FantasticToken);
};