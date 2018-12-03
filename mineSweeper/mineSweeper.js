    var lastClicked;
    var totalCells;
    var mineLocations = []
    
    var grid = clickableGrid(10,10,function(el,row,col,i){
        console.log("You clicked on element:",el);
        console.log("You clicked on row:",row);
        console.log("You clicked on col:",col);
        console.log("You clicked on item #:",i);
    
        el.className='clicked';
        if (lastClicked) lastClicked.className='';
        lastClicked = el;
    });
    
    document.body.appendChild(grid);
         
    //draw grid
    function clickableGrid(rows, cols, callback ){
        var totalRows;
        var totalColumns;
        var i = 0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        
        for (var r = 0; r < rows; ++r){
            var tr = grid.appendChild(document.createElement('tr'));
            totalRows++;
            for (var c = 0; c < cols; ++c){
                var cell = tr.appendChild(document.createElement('td'));
                totalColumns++;
                cell.addEventListener('click',(function(el,r,c,i){
                    return function(){
                        callback(el,r,c,i);
                    }
                })(cell,r,c,i),false);
            }
        }
        totalCells = (totalColumns * totalRows);
        return grid;
    }

    function getRandomGridSquare()
    {
        return Math.floor((Math.random() * 1000) + 1) % totalCells;
    }

    function randomlyAssignMines(mines)
    {
        var i, minesPlanted = 0;

        while (minesPlanted < mines)
        {
         var currentmineLocation = getRandomGridSquare();
         mineLocations.pop(currentmineLocation);
         minesPlanted++;
        }
    }