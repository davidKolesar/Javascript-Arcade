//4 things left to do
//flags
//winner grid
//graphics / sounds

/*  MINESWEEPER (JavaScript Arcade) -- David Kolesar 2018
    The goal of this project was to create a minesweeper game 
    entirely in javascript without using external libraries 
    or existing examples.
*/
    var lastClicked;
    var totalCells = 0;
    var totalColumns = 0;
    var totalMines = 10;
    var mineLocations = [];
    var checkedLocations = [];
    populateCheckedLocations();
    createButton();

    //High order function 
    var grid = clickableGrid(10,10,function(selectedCell,row,col)
    {
        console.log("You clicked on row:",row);
        console.log("You clicked on col:",col);
        
        // writes step as object literal (key value pairs)
        let step = {     
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
  
    //creates grid in html
    document.body.appendChild(grid);

    //assigns mines
    randomlyAssignMines(totalMines);

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
                console.log("dropping mine on column " + currentmineColumnLocation);
                console.log("dropping mine on row " + currentmineRowLocation);    
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
        console.log("Checking if you stepped on a mine");
        
        mineLocations.forEach(function(element) 
        {
            if(element.column == step.column && element.row == step.row) {
                alert("boom!");
                document.getElementById('gameGrid').style.visibility = "hidden";
                declareLoserGrid();
                if(confirm('Would you like to play again?')){
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

                 console.log("total mines boardering " + boarderingMines);
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
                boarderingMines = (boarderingMines + (observedBoarderingMines =  calculateMineDistances((analyzedColumn -1), (analyzedRow +1))));
                
                //search left
                boarderingMines = (boarderingMines + (observedBoarderingMines =  calculateMineDistances((analyzedColumn -1), (analyzedRow))));

                console.log("total mines boardering " + boarderingMines);

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
        //Styling stuff eventually goes into CSS document
        var body = document.getElementsByTagName('body')[0];
        var loserGrid = document.createElement('table');
        loserGrid.style.width = '300px';
        loserGrid.style.height = '300px';
        loserGrid.style.border = '3px solid black';
        loserGrid.setAttribute('border', '3');
        loserGrid.style.padding = 'padding: 2px';
        loserGrid.style.margin = '1em auto'; 
        loserGrid.style.border = 'collapse'; 
        
        //While drawing the grid, check loserGrid for minesS

        var tbdy = document.createElement('tbody');
        tbdy.style.backgroundColor = "lightgray"
        for (var i = 0; i < 10; i++) {
          var tr = document.createElement('tr');
          for (var j = 0; j < 10; j++) {
              var td = document.createElement('td');
             
              var isMinePresent = checkLoserGridForMines(i, j);
            
              if(isMinePresent == true) 
              {
                console.log('color cell red');
                td.style.backgroundColor = "red";  
                tr.appendChild(td);
              } 
              else 
              {
              console.log('No mine, so drawing blank loser cell');
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
        console.log(i + ' : cell column');
        console.log(j + ' : cell Row');
        mineLocations.forEach(function(element) 
        {   
            if(element.column == j && element.row == i) 
            {
                console.log('CELL CONTAINS MINE');
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

        function checkForWinner() {
            if(checkedLocations.length != 0) {
                alert('There are still ' + checkedLocations.length + ' remaining!');
            } else {
                alert('You win!');
            }
        }

        function populateCheckedLocations() {
              //calculate possible cell within grid
              for (var c = 0; c < 10; c++) {
                for (var r = 0; r < 10; r++) {
                    let availableCell = {     
                        column: c,  
                        row: r        
                      };

                //push into collection of locations
                checkedLocations.push(availableCell);
            }
        }
    }

    function removeFromLocations(step) {
        checkedLocations.forEach(function(element) 
        {
            if(element.column == step.column && element.row == step.row) {
                var index = checkedLocations.indexOf(element);
                console.log('removing element at index ' + index);
                checkedLocations.splice(index, 1);
                }
        });

        //removes mines from checkedLocations to ensure accurate count
        checkedLocations.forEach(function(locations){
            mineLocations.forEach(function(element){
                if(element.column == locations.column && element.row == locations.row) 
                {
                    var index = checkedLocations.indexOf(locations);
                    checkedLocations.splice(index, 1);
                } 
            });
        });

    }