// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Financify is Ownable {
    struct User {
        address wallet;
        uint256 balance;
        bool exists;
    }

    struct Investment {
        uint256 amount;
        uint256 timestamp;
    }

    struct Bill {
        string name;
        address payable recipient;
        uint256 amount;
        bool paid;
    }

    mapping(address => User) public users;
    mapping(address => Investment[]) public investments;
    mapping(address => Bill[]) public userBills;

    IERC20 public stablecoin; // USDC/DAI

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event PaymentSent(address indexed from, address indexed to, uint256 amount);
    event InvestmentMade(address indexed user, uint256 amount);
    event BillPaid(address indexed user, string billName, uint256 amount);

    constructor(address _stablecoin) {
        stablecoin = IERC20(_stablecoin);
    }

    // 🔹 Register user
    function registerUser() public {
        require(!users[msg.sender].exists, "User already registered");
        users[msg.sender] = User(msg.sender, 0, true);
    }

    // 🔹 Deposit funds (USDC/DAI)
    function deposit(uint256 amount) public {
        require(users[msg.sender].exists, "User not registered");
        require(stablecoin.transferFrom(msg.sender, address(this), amount), "Deposit failed");

        users[msg.sender].balance += amount;
        emit Deposit(msg.sender, amount);
    }

    // 🔹 Withdraw funds
    function withdraw(uint256 amount) public {
        require(users[msg.sender].balance >= amount, "Insufficient balance");

        users[msg.sender].balance -= amount;
        require(stablecoin.transfer(msg.sender, amount), "Withdraw failed");

        emit Withdraw(msg.sender, amount);
    }

    // 🔹 Send money (Pay someone)
    function sendPayment(address recipient, uint256 amount) public {
        require(users[msg.sender].balance >= amount, "Insufficient balance");

        users[msg.sender].balance -= amount;
        users[recipient].balance += amount;

        emit PaymentSent(msg.sender, recipient, amount);
    }

    // 🔹 Pay bills (Electricity, rent, etc.)
    function payBill(uint256 billIndex) public {
        require(billIndex < userBills[msg.sender].length, "Invalid bill index");
        Bill storage bill = userBills[msg.sender][billIndex];

        require(!bill.paid, "Bill already paid");
        require(users[msg.sender].balance >= bill.amount, "Insufficient balance");

        users[msg.sender].balance -= bill.amount;
        bill.recipient.transfer(bill.amount);
        bill.paid = true;

        emit BillPaid(msg.sender, bill.name, bill.amount);
    }

    // 🔹 Invest money (Simple staking)
    function invest(uint256 amount) public {
        require(users[msg.sender].balance >= amount, "Insufficient funds");

        users[msg.sender].balance -= amount;
        investments[msg.sender].push(Investment(amount, block.timestamp));

        emit InvestmentMade(msg.sender, amount);
    }

    // 🔹 Check balance
    function getBalance() public view returns (uint256) {
        return users[msg.sender].balance;
    }

    // 🔹 Check transaction history (basic)
    function getInvestments() public view returns (Investment[] memory) {
        return investments[msg.sender];
    }
}