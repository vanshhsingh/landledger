import { expect } from "chai";
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers"
// import { ethers } from "hardhat";
// import loadFixture from "@nomicfoundation/hardhat-network-helpers"
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Property Contract", function(){
    async function deployPropertyFixture(){
        const [owner,buyer,otherAccount] = await hre.ethers.getSigners();

        const Property = await hre.ethers.getContractFactory("Property");
        const property = await Property.deploy(
            "RealEstateProperty",
            "REP",
            owner.address, //Royalty Recipient
            500 //5% royalty(500 basis points)
        );
        return{property,owner,buyer,otherAccount};
    };



    describe("Deployment",function(){
        it("Should set the right owner", async function(){
            const {property,owner} = await loadFixture(deployPropertyFixture);
            expect(await property.owner()).to.equal(owner.address);
        });

        it("Should set royalty info correctly", async function(){
            const {property,owner} = await loadFixture(deployPropertyFixture);
            const [recipient,basisPoints] = await property.royaltyInfo(0,10000);
            expect(recipient).to.equal(owner.address);
            expect(basisPoints).to.equal(500);
        });
    });

    describe("Property Creation",function(){
        it("Should create a new property NFT", async function(){
            const {property,owner} = await loadFixture(deployPropertyFixture);

            const tx = await property.createProperty(
                owner.address,
                "ipfs://test-uri",
                "New Delhi",
                hre.ethers.utils.parseEther("1"),
                1500, // sq ft
                3, //bedrooms
                2, //bathrooms
                2010 // yearBuilt
            );

            await expect(tx)
            .to.emit(property,"PropertyListed")
            .withArgs(1,owner.address,hre.ethers.utils.parseEther("1"));

            const details = await property.getPropertyDetails(1);
            expect(details.location).to.equal("New Delhi");
            expect(details.price).to.equal(hre.ethers.utils.parseEther("1"));
            expect(details.status).to.equal(0); //Available
        });

        it("Should reject invalid inputs", async function(){
            const {property,owner} = await loadFixture(deployPropertyFixture);

            await expect(
                property.createProperty(
                    owner.address,
                    "", //empty URI
                    "New Delhi",
                    hre.ethers.utils.parseEther("1"),
                    1500,3,2,2010
                )
            ).to.be.revertedWith("Invalid Input");

            await expect(
                property.createProperty(
                    owner.address,
                    "ipfs://test-uri",
                    "New Delhi",
                    0,
                    1500, 3, 2, 2010
                )
            ).to.be.revertedWith("Invalid Input");
        });
    });
    
    describe("Property Transactions", function(){
        it("Should allow property purchase", async function(){
            const{ property, owner, buyer} = await loadFixture(deployPropertyFixture);

            //Create property first
            await property.createProperty
        })
    })



})