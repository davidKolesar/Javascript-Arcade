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

        // if mine was not stepped on, calculate bordering mines of selected cell
        calculateMineDistances(step);
    
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
                cell.addEventListener('click',(function(selectedCell,r,c,i){
                    return function(){
                        selectedCell.style.backgroundColor = "red";
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
         var currentmineColumnLocation = getRandomGridSquare(totalColumns);
         var currentmineRowLocation = getRandomGridSquare(totalRows);
         console.log("dropping mine on column " + currentmineColumnLocation);
         console.log("dropping mine on row " + currentmineRowLocation);

        //hold pair in object
        let currentMine = {
            column: currentmineColumnLocation,  
            row: currentmineRowLocation        
          };

         mineLocations.push(currentMine);
         minesPlanted++;
        }
    }

    //checks if user stepped on mine during last turn
    function checkForMine(step) {      
        console.log("Checking if you stepped on a mine");
        console.log(step);
        
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
                console.log("false");
                return false;
            }
        });
    }

    function calculateMineDistances() {
        var boarderingMines = 0;
        for (var i = 0; i < totalMines; i++)
            {
                var analyzedColumn = step.column;
                var analyzedRow = step.row;
                
                // search diagnal upper left
                if((analyzedColumn -1) == mineLocations.column && (analyzed.row -1) == mineLocations.row) {
                    // detect mine
                }
                //search up
                if(analyzedColumn == mineLocations.column && (analyzed.row -1) == mineLocations.row) {
                    // detect mine
                }
                //search diagnal upper right
                if((analyzedColumn +1) == mineLocations.column && (analyzed.row -1) == mineLocations.row) {
                    // detect mine
                }
                //search right
                if((analyzedColumn +1) == mineLocations.column && analyzed.row == mineLocations.row) {
                    // detect mine
                }
                //search diagnal lower right
                if((analyzedColumn +1) == mineLocations.column && (analyzed.row +1) == mineLocations.row) {
                    // detect mine
                }

                //search down
                if(analyzedColumn == mineLocations.column && (analyzed.row +1) == mineLocations.row) {
                    // detect mine
                }
                //search diagnal lower left
                if((analyzedColumn -1) == mineLocations.column && (analyzed.row +1) == mineLocations.row) {
                    // detect mine
                }
                //search left
                if((analyzedColumn -1) == mineLocations.column && analyzed.row == mineLocations.row) {
                    // detect mine
                }
            }
    }
    