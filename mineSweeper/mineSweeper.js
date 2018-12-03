    var lastClicked;
    var totalMines;
    var totalRows;
    var mineLocations = [];


        var grid = clickabd(10,10,function(el,row,col,i){
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
        var i = 0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        
        for (var r = 0; r < rows; ++r){
            var tr = grid.appendChild(document.createElement('tr'));
            totalRows++;
            for (var c = 0; c < cols; ++c){
                var cell = tr.appendChild(document.createElement('td'));
                cell.innerHTML = ++i;
                cell.addEventListener('click',(function(el,r,c,i){
                    return function(){
                        callback(el,r,c,i);
                    }
                })(cell,r,c,i),false);
            }
        }
        return grid;
    }

    function getRandomGridSquare(totalRows)
    {
        return Math.floor((Math.random() * 1000) + 1) % totalRows;
    }

    function randomlyAssignMines(mines)
    {
        var i, minesPlanted = 0;

        while (minesPlanted < mines)
        {
         var currentmineLocation = getRandomGridSquare(max);
            mineLocations = [];

        }
    }