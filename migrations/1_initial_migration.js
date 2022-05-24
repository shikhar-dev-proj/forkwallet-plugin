const Migrations = artifacts.require("Migrations");
const CronosMock = artifacts.require("CronosMock");

module.exports = async function (deployer) {
  await deployer.deploy(Migrations);
  await deployer.deploy(CronosMock);

  const tokenMock = await CronosMock.deployed();
  await tokenMock.mint(
    '0x9DA3d18d1ae468Fe266D1E60b27Cd24f86FAe343',
    '1000000000000000000000'
  )
};
