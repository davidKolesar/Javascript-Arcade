/*  MINESWEEPER (JavaScript Arcade) -- David Kolesar 2018
    The goal of this project was to create a minesweeper game 
    entirely in javascript.
*/
    var lastClicked;
    var totalCells = 0;
    var totalColumns = 0;
    var totalMines = 10;
    var mineLocations = [];
    var remainingLocations = [];

    //High order function 
    var grid = clickableGrid(10,10,function(selectedCell,row,col)
    {
        console.log("You clicked on row:",row);
        console.log("You clicked on col:",col);
        
        // writes step as object literal (key value pairs)
        let step = 
        {     
            column: col,  
            row: row        
        };

        // determines if mine was stepped on
        checkForMine(step);
        removeFromLocations(step);
    
        selectedCell.className='clicked';
        if (lastClicked) lastClicked.className='';
        lastClicked = selectedCell;
    });

    createButton();

    //creates grid in html
    document.body.appendChild(grid);

    randomlyAssignMines(totalMines);

    populateRemainingLocations();

    //draw grid (callback function)
    function clickableGrid(rows, cols, callback)
    {
        var i = 0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        grid.setAttribute('id', 'gameGrid');
        
        for (var r = 0; r < rows; ++r)
        {
            totalColumns++;
            var tr = grid.appendChild(document.createElement('tr'));
            for (var c = 0; c < cols; ++c)
            {
                totalCells++;
                var cell = tr.appendChild(document.createElement('td'));
                cell.addEventListener('click',(function(selectedCell,r,c,i)
                {
                    return function()
                    {
                        var totalBoarderingMines = searchBoarderingMines(r,c);
                        selectedCell.innerHTML = totalBoarderingMines;
                        callback(selectedCell,r,c,i);
                    }
                })(cell,r,c,i),false);
                
            }
        }
        return grid;
    }

    function getRandomGridSquare(total)
    {
        return Math.floor((Math.random() * 1000) + 1) % total;
    }

    function randomlyAssignMines(totalMines)
    {
        var i, minesPlanted = 0;
        var totalRows = (totalCells / totalColumns);

        //drop a single mine on single column / row combination  
        while (minesPlanted < totalMines)
        {
         var duplicateLocation = false;
         var currentmineColumnLocation = getRandomGridSquare(totalColumns);
         var currentmineRowLocation = getRandomGridSquare(totalRows);

            //Checking column / row combination is unique
            mineLocations.forEach(function(element) 
            {   
                if(element.column == currentmineColumnLocation && element.row == currentmineRowLocation) 
                {
                    duplicateLocation = true;
                } 
            });
            
            if (duplicateLocation == false) 
            {  
                dropMines(currentmineColumnLocation, currentmineRowLocation);
                minesPlanted++;
            }
        }
    }

    function dropMines (currentmineColumnLocation, currentmineRowLocation) 
    {
        //hold pair in object
        let currentMine = {
            column: currentmineColumnLocation,  
            row: currentmineRowLocation        
          };

         mineLocations.push(currentMine);
    }

    //checks if user stepped on mine during last turn
    function checkForMine(step) {      
        mineLocations.forEach(function(element) 
        {
            if(element.column == step.column && element.row == step.row) {
                alert("BOOM!");
                document.getElementById("gameGrid").style.display = "none"; 
                declareLoserGrid();

                if(confirm('Would you like to play again?'))
                {
                    window.location.reload();  
                }
                //reveal mines 
                return true;
            } else {
                return false;
            }
        });
    }

    function searchBoarderingMines(r, c) {
                var boarderingMines = 0;
                var observedBoarderingMines = 0;
                var analyzedColumn = c;
                var analyzedRow = r;
                
                // search diagnal upper left
                boarderingMines  = (boarderingMines + (observedBoarderingMines = calculateMineDistances((analyzedColumn -1), (analyzedRow -1))));

                //search up
                boarderingMines = (boarderingMines + (observedBoarderingMines = calculateMineDistances((analyzedColumn), (analyzedRow -1))));
                
                //search diagnal upper right
                boarderingMines  = (boarderingMines + (observedBoarderingMines =  calculateMineDistances((analyzedColumn +1), (analyzedRow -1))));
                
                //search right
                boarderingMines = (boarderingMines + (observedBoarderingMines = calculateMineDistances((analyzedColumn +1), (analyzedRow))));

                //search diagnal lower right
                boarderingMines = (boarderingMines + (observedBoarderingMines =  calculateMineDistances((analyzedColumn -1), (analyzedRow +1))));

                //search down
                boarderingMines = (boarderingMines + (observedBoarderingMines =  calculateMineDistances((analyzedColumn), (analyzedRow +1))));
            
                //search diagnal lower left
                boarderingMines = (boarderingMines + (observedBoarderingMines =  calculateMineDistances((analyzedColumn +1), (analyzedRow +1))));
                
                //search left
                boarderingMines = (boarderingMines + (observedBoarderingMines =  calculateMineDistances((analyzedColumn -1), (analyzedRow))));

                return boarderingMines;
    } 

    function calculateMineDistances(analyzedColumn, analyzedRow) 
    {
        var minesObserved = 0;

        //guard from checking off the grid
        if(analyzedColumn == -1 || analyzedRow == -1){
            minesObserved;
        } 

        mineLocations.forEach(function(element) 
        {
            if(element.column == analyzedColumn && element.row == analyzedRow) 
            {
                ++minesObserved;
            } 
        });
        return minesObserved;
    }
    
    function declareLoserGrid()
    {
        var loserGrid = document.createElement('table');
        loserGrid.className = 'loserGrid';
        loserGrid.setAttribute('id', 'loserGrid');
        drawLoserGrid(loserGrid);
    }

    //draw losing grid with visible mines
    function drawLoserGrid(loserGrid)
    {
        console.log('Drawing loser grid!');
        var body = document.getElementsByTagName('body')[0];
        var loserGrid = document.createElement('table');
        
        //While drawing the grid, check loserGrid for mines
        var tbdy = document.createElement('tbody');
        tbdy.style.backgroundColor = "lightgray"
        for (var i = 0; i < 10; i++) {
          var tr = document.createElement('tr');
          for (var j = 0; j < 10; j++) {
              var td = document.createElement('td');
             
              var isMinePresent = checkLoserGridForMines(i, j);
            
              if(isMinePresent == true) 
              {
                console.log('Mine present -- color cell red');
                td.style.backgroundColor = "red";  
                tr.appendChild(td);
              } 
              else 
              {
              tr.appendChild(td);
              }
          }
          tbdy.appendChild(tr);
        }
        loserGrid.appendChild(tbdy);
        body.appendChild(loserGrid)
      }

     function checkLoserGridForMines(i, j) 
    {
        var containsMine = false;
        mineLocations.forEach(function(element) 
        {   
            if(element.column == j && element.row == i) 
            {
                containsMine = true;
            }
        });
        return containsMine;
     }

    function createButton() {
        // 1. Create the button
        button = document.createElement("button");
           button.innerHTML = "Minefield is Secure";
        
        // 2. Append somewhere
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(button);
        
        // 3. Add event handler
        button.addEventListener ("click", function() {
            checkForWinner();
        });
        }

        var cellsRemaining = (remainingLocations.length - 1);

        function checkForWinner() {
            if(remainingLocations.length != 0) {
                alert('There are still ' + remainingLocations.length + ' remaining!');
            } else {
                alert('You win!');
                if(confirm('Play again?')){
                    window.location.reload();  
                }
            }
        }

        function populateRemainingLocations() {
              //calculate possible cell within grid
              for (var c = 0; c < 10; c++) {
                for (var r = 0; r < 10; r++) {
                    let availableCell = {     
                        column: c,  
                        row: r        
                      };

                //push into collection of locations
                remainingLocations.push(availableCell);
            }
        }

        //removes mines from remainingLocations to ensure accurate count
        var indicesToRemove = [];
        remainingLocations.forEach(function(locations){
            mineLocations.forEach(function(element){
                if(element.column == locations.column && element.row == locations.row) 
                {
                    var index = remainingLocations.indexOf(locations);
                    indicesToRemove.push(index);
                } 
            });
        });

        for(var i = 0; i < indicesToRemove.length; i++){
            remainingLocations.splice(indicesToRemove[i], 1);
        }
    }

    function removeFromLocations(step) {
        remainingLocations.forEach(function(element) 
        {
            if(element.column == step.column && element.row == step.row) {
                var index = remainingLocations.indexOf(element);
                remainingLocations.splice(index, 1);
                }
        });
    }