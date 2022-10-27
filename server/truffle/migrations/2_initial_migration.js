const FantasticNFT = artifacts.require('FantasticNFT')

module.exports = function (deployer) {
  deployer.deploy(FantasticNFT);
};