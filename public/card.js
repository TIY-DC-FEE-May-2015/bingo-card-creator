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
        wholeCard()
        break;
      case "corners":
        corners()
        break;
      case "outline":
        outline()
        break;
      case "hashtag":
       hashtag()
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
    }
  }

  var wholeCard = function(){
    var cols = _.reduce($scope.board, function(memory, row){
      
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])

    var x = _.every( _.flatten($scope.board) , _.identity)

    if (x) {
      $scope.winner = true
    }
  }

  var corners =function(){
    var cols = _.reduce($scope.board, function(memory, row){
      
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])
    console.log($scope.board)
    var newArray = []
    for(var i=0 ; i< $scope.board.length ; i++){
      var innerArray = $scope.board[i]
      var outterArray = $scope.board[$scope.board.length -1]
      if(innerArray[0] === 1 && innerArray[4] === 1 && outterArray[0] === 1 && outterArray[4] === 1 ){
        $scope.winner = true
      }
    }
    
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




    var a = _.every(($scope.board[0]) , _.identity)
    var b = _.every(($scope.board[4]) , _.identity)

    
    if(a && b){
      $scope.winner = true
    }
    
  }
  var hashtag = function(){
    var cols = _.reduce($scope.board, function(memory, row){
      
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [ 1, 1, 1, 1, 1 ])




    var a = _.every(($scope.board[1]) , _.identity)
    var b = _.every(($scope.board[3]) , _.identity)

    
    if(a && b){
      $scope.winner = true
    }

  }
})