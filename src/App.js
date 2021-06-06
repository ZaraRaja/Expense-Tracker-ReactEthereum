import React, { Component } from "react";
import Web3 from "web3";
import TruffleContract from "truffle-contract";
import ExpenseTracker from "../src/build/contracts/ExpenseTracker.json";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      transactions: [],
      incomeTitle: "",
      expenseTile: "",
      incomeAmount: "",
      expenseAmount: "",
      balance: "",
      sender: "",
      income: "",
      expense: "",
      amount: 0,
      title: "",
      owner: "",
    };

    var web3 = new Web3();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function() {      
        });
      } catch (e) {
       console.log(e);
      }
    } else if (window.web3) {
      web3 = new Web3(web3.currentProvider);
    } else {
      alert("You have to install MetaMask !");
    }
    window.ethereum.enable();
    if (typeof web3 != "undefined") {
      this.web3Provider = web3.currentProvider;
      window.ethereum.enable();
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        `https://ropsten.infura.io/v3/fff8db965a164101b930ca3af2f65e30`
      );
      window.ethereum.enable();
    }

  
    this.web3 = new Web3(this.web3Provider);
    this.makeTransaction = this.makeTransaction.bind(this);
    this.addExpenseTransaction = this.addExpenseTransaction.bind(this);
    this.resetAmount = this.resetAmount.bind(this);
    this.ExpenseTracker = TruffleContract(ExpenseTracker);
    this.ExpenseTracker.setProvider(this.web3Provider);
  }
  incomeTitle = (e) => {
    this.setState({ incomeTitle: e.target.value });
    console.log("IncomeTitle Set as", this.state.incomeTitle);
  };
  incomeAmount = (e) => {
    this.setState({ incomeAmount: e.target.value });
    console.log("IncomeAmount Set as", this.state.incomeAmount);
  };
  expenseTitle = (e) => {
    this.setState({ expenseTitle: e.target.value });
    console.log("ExpenseTitle", this.state.expenseTile);
  };
  expenseAmount = (e) => {
    this.setState({ expenseAmount: e.target.value });
    console.log("ExpenseAmount", this.state.expenseAmount);
  };

  async componentDidMount() {
    this.web3.eth.getCoinbase(async (err, account) => {
      console.log("getCoinbase = ", account);
      this.setState({ account: account });
      this.ExpenseTracker.deployed().then(async (expenseInstance) => {
        this.expenseInstance = expenseInstance;
        const balance1 = await this.expenseInstance.balance();
        const income1 = await this.expenseInstance.income();
        const expense1 = await this.expenseInstance.expense();

        this.setState({ balance: balance1.toString() });
      

        this.setState({ income: income1.toString() });
        

        this.setState({ expense: expense1.toString() });
        
        const transactionCount = await this.expenseInstance.getLength();
        const transactions = [];
        for (var i = 0; i < transactionCount; i++) {
          const transaction = await this.expenseInstance.transactions(i);
          transactions.push({
            title: transaction[0],
            amount: transaction[1],
            owner: transaction[2],
          });
        }
        this.setState({ transactions: transactions });
        
      });
    });
  }

  async resetAmount(e, values) {
    e.preventDefault();
    this.web3.eth.getCoinbase(async (err, account) => {
      this.setState({ account: account });
      this.ExpenseTracker.deployed().then(async (expenseInstance) => {
        this.expenseInstance = expenseInstance;

        try {
         await this.expenseInstance.reset({
            from: this.state.account,
          });
        } catch (e) {
          console.log("Error from log", e);
        }
        const balance1 = await this.expenseInstance.balance();
        const income1 = await this.expenseInstance.income();
        const expense1 = await this.expenseInstance.expense();

        this.setState({ income: income1.toString() });
        

        this.setState({ balance: balance1.toString() });
        

        this.setState({ expense: expense1.toString() });
       
        const transactionCount = await this.expenseInstance.getLength();
        const transactions = [];
        for (var i = 0; i < transactionCount; i++) {
          const transaction = await this.expenseInstance.transactions(i);
          transactions.push({
            title: transaction[0],
            amount: transaction[1],
            owner: transaction[2],
          });
        }
        this.setState({ transactions: transactions });
      
      });
    });
  }

  async makeTransaction(e, values) {
    e.preventDefault();
  
    this.web3.eth.getCoinbase(async (err, account) => {
      
      this.setState({ account: account });
     
      this.ExpenseTracker.deployed().then(async (expenseInstance) => {
        this.expenseInstance = expenseInstance;
              
        try {
         
          await this.expenseInstance.addIncome(
            this.state.incomeTitle,
            this.state.incomeAmount,
            {
              from: this.state.account,
            }
          );
          
        } catch (e) {
          console.log("Error from log", e);
        }
       
      
        const balance1 = await this.expenseInstance.balance();
        const income1 = await this.expenseInstance.income();
        const expense1 = await this.expenseInstance.expense();

        this.setState({ income: income1.toString() });
        

        this.setState({ balance: balance1.toString() });
       

        this.setState({ expense: expense1.toString() });
       
        const transactionCount = await this.expenseInstance.getLength();
        const transactions = [];
        for (var i = 0; i < transactionCount; i++) {
          const transaction = await this.expenseInstance.transactions(i);
          transactions.push({
            title: transaction[0],
            amount: transaction[1],
            owner: transaction[2],
          });
        }
        this.setState({ transactions: transactions });
  
      });

    });
    
  
  }

  async addExpenseTransaction(e, values) {
    e.preventDefault();
    this.web3.eth.getCoinbase(async (err, account) => {
      this.setState({ account: account });
      this.ExpenseTracker.deployed().then(async (expenseInstance) => {
        this.expenseInstance = expenseInstance;

        try {
         await this.expenseInstance.addExpense(
            this.state.expenseTitle,
            this.state.expenseAmount,
            {
              from: this.state.account,
            }
          );
        } catch (e) {
          console.log("Error from log", e);
        }
        const balance1 = await this.expenseInstance.balance();
        const income1 = await this.expenseInstance.income();
        const expense1 = await this.expenseInstance.expense();

        this.setState({ income: income1.toString() });
        this.setState({ balance: balance1.toString() });
         this.setState({ expense: expense1.toString() });
        const transactionCount = await this.expenseInstance.getLength();
        const transactions = [];
        for (var i = 0; i < transactionCount; i++) {
          const transaction = await this.expenseInstance.transactions(i);
          transactions.push({
            title: transaction[0],
            amount: transaction[1],
            owner: transaction[2],
          });
        }
        this.setState({ transactions: transactions });
        
      });
    });
  }

  render() {
     const { transactions } = this.state;
    return (
      <div>
       
    
        <h2>
          Expense Tracker Address :{" "}
          <span style={{ fontSize: "16px" }}>{this.state.account}</span>{" "}
        </h2>
       
        <div className="container">
          <h4>Your Balance</h4>
          <h1> PKR {this.state.balance}</h1>

          <div className="inc-exp-container">
            
            <div>
              <h4>Income</h4>
              <p className="money plus">PKR {this.state.income}</p>
            </div>
            <div>
              <h4>Expense</h4>
              <p className="money minus">PKR {this.state.expense}</p>
            </div>
          </div>
          <div className="list">
            <h2>History</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Amount</th>
              
            </tr>
          </thead>
          <tbody>
            {!transactions.length ? (
              <tr>
                {" "}
                <td 
                 
                >
                  {" "}
                  No Data Available
                </td>
              </tr>
            ) : (
              transactions.map((values, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td >{values.title}</td>
                    <td>{values.amount.toString()}</td>
                  
                  </tr>
                );
              })
            )}
          </tbody>
          </table>
          </div>

          <div className="inc-transaction-container">
         
            <h3>Add New Income</h3>
            <form id="form">
              <div className="form-control">
                <label htmlFor="text">Income Title</label>
                <input
                
                  type="text" 
                  placeholder="Enter income title..."
                  onChange={this.incomeTitle}
                />
              </div>
              <div className="form-control">
                <label htmlFor="amount">
                  Amount <br />
                </label>
                <input
                  type="number"
                  placeholder="Enter amount..."
                  onChange={this.incomeAmount}
                />
              </div>
              <button className="btn" onClick={this.makeTransaction}>
                Add Income
              </button>
            </form>
          </div>
          <div className="inc-addtransaction-container">
            <h3>Add New Expense</h3>
            <form id="form">
              <div className="form-control">
                <label htmlFor="text">Expense Title</label>
                <input
                  type="text"
                  placeholder="Enter expense title..."
                  onChange={this.expenseTitle}
                />
              </div>
              <div className="form-control">
                <label htmlFor="amount">
                  Amount <br />
                </label>
                <input
                  type="number"
                  placeholder="Enter amount..."
                  onChange={this.expenseAmount}
                />
              </div>
              <button
                className="btnExpense"
                onClick={this.addExpenseTransaction}
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>

        <button
          style={{
            cursor: "pointer",
            backgroundColor: "black",
            boxShadow: "var(--box-shadow)",
            color: "#fff",
            fontSize: "16px",
            margin: "10px 0 30px 290px",
            width: "100px",
            height: "40px",
          }}
          onClick={this.resetAmount}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default App;
