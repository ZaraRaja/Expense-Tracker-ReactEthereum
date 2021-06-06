pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;


contract ExpenseTracker {
    
    

    struct Transaction {
       
        string title;
        int64 amount;
        address sender;
    }
    
    int public balance = 0;
    int64 public income=0;
    int64 public expense=0;
    Transaction[] public transactions;

    
    function addIncome(string memory _description , int64 _amount) public {
  
        income= income+_amount;
        Transaction memory transaction = Transaction(_description,_amount, msg.sender);
        transactions.push(transaction);
        balance += _amount;
        
    }
    
     function addExpense(string memory _description , int64 _amount) public {
        expense= expense+_amount;
        Transaction memory transaction = Transaction(_description,_amount, msg.sender);
        transactions.push(transaction);
        balance -= _amount;
    
    }
    
   
    function getAll() public view returns (Transaction[] memory) {
        return transactions;
    }
    

    function reset() public{ 
       balance=0;
       income=0;
       expense=0;
    }
    

     function getLength() public view returns (uint256) {
        return transactions.length;
    }
    
    
   
}