const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("Web3Bottle");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to: ", nftContract.address);

  // Call the function.
  let txn = await nftContract.mintNFT(
    "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiByZ2IoMjIyLCAxMzQsIDM5KTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J3JnYigyNTUsIDI1NCwgMjU0KScgLz48dGV4dCB4PSc1JScgeT0nMjIlJyBjbGFzcz0nYmFzZScgZG9taW5hbnQtYmFzZWxpbmU9J21pZGRsZScgdGV4dC1hbmNob3I9J3N0YXJ0Jz48dHNwYW4geD0nNSUnIGR5PScxLjZlbSc+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVlciBhZGlwaXNjaW5nIGU8L3RzcGFuPjx0c3BhbiB4PSc1JScgZHk9JzEuNmVtJz5saXQuIEFlbmVhbiBjb21tb2RvIGxpZ3VsYSBlZ2V0IGRvbG9yLiBBZW5lYW4gbWFzc2EuIDwvdHNwYW4+PHRzcGFuIHg9JzUlJyBkeT0nMS42ZW0nPkN1bSBzb2NpaXMgbmF0b3F1ZSBwZW5hdGlidXMgZXQgbWE8L3RzcGFuPjwvdGV4dD48L3N2Zz4="
  );
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await nftContract.mintNFT(
    "PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiByZ2IoMjIyLCAxMzQsIDM5KTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J3JnYigyNTUsIDI1NCwgMjU0KScgLz48dGV4dCB4PSc1JScgeT0nMjIlJyBjbGFzcz0nYmFzZScgZG9taW5hbnQtYmFzZWxpbmU9J21pZGRsZScgdGV4dC1hbmNob3I9J3N0YXJ0Jz48dHNwYW4geD0nNSUnIGR5PScxLjZlbSc+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVlciBhZGlwaXNjaW5nIGU8L3RzcGFuPjx0c3BhbiB4PSc1JScgZHk9JzEuNmVtJz5saXQuIEFlbmVhbiBjb21tb2RvIGxpZ3VsYSBlZ2V0IGRvbG9yLiBBZW5lYW4gbWFzc2EuIDwvdHNwYW4+PHRzcGFuIHg9JzUlJyBkeT0nMS42ZW0nPkN1bSBzb2NpaXMgbmF0b3F1ZSBwZW5hdGlidXMgZXQgbWE8L3RzcGFuPjwvdGV4dD48L3N2Zz4="
  );
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #2");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
