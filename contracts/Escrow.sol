// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17

import "./Property.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Escrow
 * @dev Manages escrow process for real estate transactions
 */

contract Escrow is ReentrancyGuard, Ownable{
    Property private propertyContract;

    // Escrow Status
    enum EscrowStatus{
        Created,
        EarnestMoneyDeposited,
        InspectionPassed,
        AppraisalPassed,
        FinalPaymentDeposited,
        Completed,
        Cancelled
    }

    struct EscrowDetails{
        uint256 propertyId;
        address seller;
        address buyer;
        uint256 price;
        uint256 earnestMoneyAmount;
        uint256 earnestMoneyDeposited;
        uint256 finalPayment;
        uint256 finalPaymentDeposited;
        EscrowStatus status;
        bool inspectionPassed;
        bool appraisalPassed;
        uint256 createdAt;
        uint256 completedAt;
    }

    // Mapping from escrow ID to escrow details
    mapping(uint256=>EscrowDetails) public escrows;
    uint256 private escrowCounter;

    // Mapping from property ID to escrow ID
    mapping(uint256=>uint256) public propertyToEscrow;

    // Events
    event EscrowCreated(uint256 indexed escrowId, uint256 indexed propertyId, address seller, address buyer);
    event EarnestMoneyDeposited(uint256 indexed escrowId, uint256 amount);
    event InspectionStatusUpdated(uint256 indexed escrowId, bool passed);
    event AppraisalStatusUpdated(uint256 indexed escrowId, bool passed);
    event FinalPaymentDeposited(uint256 indexed escrowId, uint256 amount);
    event EscrowCompleted(uint256 indexed escrowId);
    event EscrowCancelled(uint256 indexed escrowId);
    event FundsReleased(uint256 indexed escrowId, address to, uint256 amount);

    constructor(address _propertyContract){
        propertyContract = Property(_propertyContract);
    }
    
    /**
     * @dev Creates a new escrow for a property transaction
     */
    function createEscrow(
        uint256 _propertyId,
        address buyer,
        uint256 earnestMoneyAmount
    ) external returns (uint256){
        require(propertyContract.ownerOf(_propertyId) == msg.sender, "Only property owner can create escrow");
        require(propertyToEscrow[_propertyId]==0,"Escro already exists for this property");

        Property.PropertyDetails memory details = propertyContract.propertyDetails(_propertyId);
        require(details.status == Property.PropertyStatus.Available, "Property not available");

        escrowCounter++;
        uint256 escrowId = escrowCounter;

        escrows[escrowId] = EscrowDetails({
            propertyId: _propertyId,
            seller = msg.sender,
            buyer = _buyer,
            price = details.price,
            earnestMoneyAmount: _earnestMoneyAmount,
            earnestMoneyDeposited: 0,
            finalPayment: details.price - _earnestMoneyAmount,
            finalPaymentDeposited: 0,
            status: EscrowStatus.Created,
            inspectionPassed: false,
            appraisalPassed:false,
            createdAt: block.timestamp,
            completedAt: 0
        });

        propertyToEscrow[_propertyId] = escrowId;

        // Update Property Status
        propertyContract.updatePropertyStatus(_propertyId, Property.PropertyStatus.UnderContract);
        
        emit EscrowCreated(escrowId, _propertyId, msg.sender, _buyer);
        
        return escrowId;
    }

    /**
     * @dev Deposit earnest money to escrow
     */
    function depositEarnestMoney(uint256 _escrowId) external payable nonReentrant{
        EscrowDetails storage escrow = escrows[_escrowId];

        require(escrow.buyer == msg.sender,"Only buyer can deposit earnest money");
        require(escrow.status == EscrowStatus.Created, "Invalid escrow status for this action");
        require(msg.value == escrow.earnestMoneyAmount, "Incorrect earnest money amount");

        escrow.earnestMoneyDeposited = msg.value;   
        escrow.status = EscrowStatus.EarnestMoneyDesposited;

        emit EarnestMoneyDeposited(_escrowId, msg.value);
    }

    /**
     * @dev Update Inspection Status
     */

}