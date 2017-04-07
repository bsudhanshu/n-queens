/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; 
  var board = new Board({n:n});
  
  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      }
    }
  }
  solution = _.range(n).map(function (row) {return board.get(row);});

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n:n});

  var solFinder = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        solFinder(row+1);
      } 
      board.togglePiece(row, i);
    }
  };
  solFinder(0);  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};  

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; 
  var board = new Board({n:n});

  var solFinder = function (row) {
    if (row === n) {
      solution = _.map(board.rows(), function(solRow){
        return solRow.slice();
      });
      return true;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        var result = solFinder(row+1);
        if(result){
          return result;
        }
      } 
      board.togglePiece(row, i);
    }
    return false;
  };
  solFinder(0); 

  solution = solution || board.rows();
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n:n});

  var solFinder = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        solFinder(row+1);
      } 
      board.togglePiece(row, i);
    }
  };
  solFinder(0); 

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
