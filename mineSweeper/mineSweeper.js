    var lastClicked;
    var totalCells = 0;
    var totalMines = 10;
    var mineLocations = [];
    
    var grid = clickableGrid(10,10,function(el,row,col,i)
    {
        console.log("You clicked on row:",row);
        console.log("You clicked on col:",col);
        var step = (row * col);
        isStepOnMine(step);
    
        el.className='clicked';
        if (lastClicked) lastClicked.className='';
        lastClicked = el;
    });
  
    //creates grid in html
    document.body.appendChild(grid);

    //assigns mines
    randomlyAssignMines(totalMines);

    //draw grid
    function clickableGrid(rows, cols, callback)
    {
        var i = 0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        
        for (var r = 0; r < rows; ++r)
        {
            var tr = grid.appendChild(document.createElement('tr'));
            for (var c = 0; c < cols; ++c)
            {
                var cell = tr.appendChild(document.createElement('td'));
                cell.addEventListener('click',(function(el,r,c,i){
                    return function(){
                        callback(el,r,c,i);
                    }
                })(cell,r,c,i),false);
            }
        }
        totalCells = (cols * rows);
        return grid;
    }

    function getRandomGridSquare()
    {
        return Math.floor((Math.random() * 1000) + 1) % totalCells;
    }

    function randomlyAssignMines(totalMines)
    {
        var i, minesPlanted = 0;

        while (minesPlanted < totalMines)
        {
         var currentmineLocation = getRandomGridSquare();
         console.log("dropping mine on " + currentmineLocation);
         mineLocations.push(currentmineLocation);
         minesPlanted++;
        }
    }

    function isStepOnMine(step) {      

            function contains(mineLocations, step) {
                console.log("user stepped on " + step);
                for (var i = 0; i < a.length; i++) {
                    if (mineLocations[i] == step) {
                        console.log(true);
                        return true;
                    }
                }
                console.log(false);
                return false;
        }
    }