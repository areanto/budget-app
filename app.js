// BUDGET CONTROLLLER
var budgetController = (function() {

    // each new item needs description and a value + distinguish by #id income vs. expense
    
    
    // create a function constructor for income and expense types

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Data store
    var data = {
        
        allItems: {
            exp: [],
            inc: []
        },        
        totals: {
            exp: 0,
            inc: 0
        }
    };
    
    // create public method to allow other modules to add new items to the data structure
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            // assign a unique id to each new expense or income item
            // ID = last ID + 1
            
            // create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // console.log('The new ID for this item is: ' + ID);
            
            // create new item based on 'inc' or 'exp' type
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }
            
            // add new exp or inc to the end of the allItems.exp or allItems.inc array
            data.allItems[type].push(newItem);
            
            // return the new item
            return newItem;
            
        }, 
        
        testing: function() {
            console.log(data);
        }
        
    }

})();




// UI CONTROLLER
var UIController = (function () {

    // create private variable/object to store DOM strings
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    // return an object that contains a method to get input values
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        // pass DOMstrings object to the global app controller
        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();



 
 // GLOBAL APP CONTROLLER 
 var controller = (function(budgetCtrl, UICtrl) {
     
    // private function that sets up the event listeners
    var setupEventListeners = function() {
       
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
        
            // use .which to add support for older browsers
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem(); 
            }
        
        });
    };
    
    
      
    // private function that gets called when we want to add a new item
    var ctrlAddItem = function(){
        
        // 1. Get the field input data when enter key or button is clicked
        var input = UICtrl.getInput();
        
        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        // 3. Add the new item to the UI
        
        
        // 4. Calculate the budget
        
        
        // 5. Display the budget on the UI
        
    };

         
     // create a public initialization function
     // return in an object to make public
     

    return {
        init: function() {
            console.log("application has started");
            setupEventListeners();
        }
    }


})(budgetController, UIController);

controller.init();