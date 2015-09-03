var app = angular.module("bingoCardApp", [])

app.controller("CardController", function($scope){

  $scope.board = [ 
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0 ],
    [ 0, 0, 0, 0, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ]

  $scope.cardRule = "line"

  $scope.clickSquare = function(squareRow, squareColumn) {
    $scope.board[squareRow][squareColumn] = 1

    switch($scope.cardRule) {
      case "line":
        straightLine()
        break;

      case "fullCard":
        fullCard()
        break;

      case "corners":
      cornerCard()
        break;

      case "outline":
        outline()
        break;


      case "hashtag":
        hashtagCard()
        break;
      
    }
  }

  var straightLine = function() {
    var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) { 
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

    var matchInColumns = _.some(cols)
    console.log(matchInColumns)

    var matchInRows = _.some($scope.board, function(row){
      return _.every(row)
    })

    var leftDiagonalMatch = 1
    _.times(5, function(i){
      if (leftDiagonalMatch === 0) {
        return 0
      }
      leftDiagonalMatch = $scope.board[i][i]
    })

    var rightDiagonalMatch = 1
    _.times(5, function(i){
      if (rightDiagonalMatch === 0) {
        return 0
      }
      rightDiagonalMatch = $scope.board[i][4 - i]
    })

    var matchInDiagonal = (leftDiagonalMatch || rightDiagonalMatch)

    if (matchInColumns || matchInRows || matchInDiagonal) {
      $scope.winner = true
      alert("YOU ARE A WINNER")
      setInterval('window.location.reload()',6000);
    }
  }

  var fullCard = function() {
    console.log($scope.winner = _.every( _.flatten($scope.board) ) )
    setInterval('window.location.reload()',6000);
  }

  var outline = function(){ 
      var cols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

   

      var row = _.every($scope.board[0], _.identity)
      var column = _.every($scope.board[4], _.identity)
      console.log(row, column)

      if (row && column) {
       $scope.winner = true
       alert("YOU ARE A WINNDER")
       setInterval('window.location.reload()',6000);
      }
  }    
    


  var cornerCard = function(){
    
    var corners = 1
    _.times(5, function(i){
      if (corners === 0) {
        return 0
    }
    corners = $scope.board[0][0] && $scope.board[0][4] && $scope.board[4][0] && $scope.board[4][4]
    })

    if (corners){
      $scope.winner = true
      alert("YOU ARE A WINNER")
      setInterval('window.location.reload()',6000);
    }
      
  }
        

  var hashtagCard= function(){
     var cols = _.reduce($scope.board, function(memory, column){
      return _.map(column, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

      var row = _.every($scope.board[1], _.identity)
      var column = _.every($scope.board[3], _.identity)
      console.log(row, column)

      if (row && column) {
       $scope.winner = true
       alert("YOU ARE A WINNDER")
       setInterval('window.location.reload()',6000);

      }


  }

})