//4 things left to do
//calculate mines
//disable grid
//flags
//graphics / sounds

    var lastClicked;
    var totalCells = 0;
    var totalColumns = 0;
    var totalMines = 10;
    var mineLocations = [];
    

    //High order function 
    var grid = clickableGrid(10,10,function(selectedCell,row,col,i)
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
                        selectedCell.style.backgroundColor = "red";
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
        mineLocations.forEach(function(element) 
        {
            if(element.column == analyzedColumn && element.row == analyzedRow) 
            {
                minesObserved ++;
            } 
        });
        return minesObserved;
    }