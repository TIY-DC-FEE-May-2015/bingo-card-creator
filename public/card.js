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

  var checkSpecificColumn = function(index) {
    if ( _.every($scope.board[index]) ){
      return true
    }
  }

  var checkMultipleColumns = function(arrayOfNumbers) {
    for (var i = 0; i < arrayOfNumbers.length; i++) {
      if ( !checkSpecificColumn( arrayOfNumbers[i] ) ) {
        return
      }
    }
    return true
  }

  var checkSpecificRow = function(index){
    //because transposed we are going vertically 
      //for each vertical col, check the number index of index
    var col = _.map($scope.board, function(col){
      return col[index]
    })
    //if all are true, we good
    return _.every(col)
  }

  var checkMultipleRows = function(arrayOfNumbers) {
    for (var i = 0; i < arrayOfNumbers.length; i++) {
      if ( !checkSpecificRow( arrayOfNumbers[i] ) ) {
        return
      }
    }
    return true
/*   return _.every(arrayOfNumbers, function(i){
      return checkSpecificRow(i)
    })*/
  }

  var checkDiagonal = function(str) {
    var diagonal = 1
    _.times(5, function(i){
      if (diagonal === 0) {
        return 0
      }
      if (str === "down") {
        diagonal = $scope.board[i][i]
      }
      if (str === "up"){
        diagonal = $scope.board[i][4-i]
      }
    })
    return diagonal
  }


  
/*    var rightDiagonalMatch = 1
    _.times(5, function(i){
      if (rightDiagonalMatch === 0) {
        return 0
      }
      rightDiagonalMatch = $scope.board[i][4 - i]
    })

    var matchInDiagonal = (leftDiagonalMatch || rightDiagonalMatch)*/



  $scope.clickSquare = function(squareRow, squareColumn) {
    $scope.board[squareRow][squareColumn] = 1

    switch($scope.cardRule) {
      case "line":
        straightLine()
        break
      case "fullCard":
        fullCard()
        break
      case "corners":
        corners()
        break
      case "outline":
        outline()
        break
      case "hashtag":
        hashtag()
        break
      case "prisonBars":
        prisonBars()
        break
      case "teamZissou":
        teamZissou()
        break
    }
  }






  var teamZissou = function(){
    var diagonalMatch = checkDiagonal("up") 
    if ( checkMultipleRows([0, 4]) && diagonalMatch ) {
      $scope.winner=true
    }
  }

  var prisonBars = function(){
      if( checkMultipleColumns([0,2,4]) ) {
        $scope.winner = true
      }
  }

  var hashtag = function(){
    if ( checkMultipleRows([1, 3]) && checkMultipleColumns([1, 3]) ) {
      $scope.winner = true
    }
  }

  var outline = function(){
    if ( checkMultipleRows([0,4]) && checkMultipleColumns([0,4]) ) {
      $scope.winner = true
    }
  }

  var corners = function(){
    var allCorners = 1
    var rowIndex
    var colIndex

    for (var i = 0; i < 4; i++){  
      if (i < 2) {
        rowIndex = 0
      } else {
        rowIndex = 4
      }

      if (i % 2 === 0) {
        colIndex = 0
      } else {
        colIndex = 4
      }

      if (allCorners === 0) {
        return 0
      }

      allCorners = $scope.board[rowIndex][colIndex]

    }
    if (allCorners) {
      $scope.winner = true
    } 

  }

  var fullCard = function(){
    var allCells = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (memory[index] === 0) {
          return 0
        }
        return cell
      })
    }, [1,1,1,1,1])

    var matchAll = _.every(allCells)

    if (matchAll) {
      $scope.winner = true
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

    var matchInDiagonal = ( checkDiagonal("up") || checkDiagonal("down") )

    if (matchInColumns || matchInRows || matchInDiagonal) {
      $scope.winner = true
    }
  }

})


//removed from var hashtag:
/*    var matchInColumns = _.some($scope.board, function(row){
      var leftCol =  _.every($scope.board[1])
      var rightCol =  _.every($scope.board[3])
      if (leftCol && rightCol) {
        console.log("col")
        return true
      }

    var matchInRows = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (index === 1){ 
          if (memory[index] === 0 ) {
            return 0
          }
          return cell
        }

       if (index === 3){ 
        if (memory[index] === 0 ) {
            return 0
          }
          return cell
        }        
      })

    }, [1,1,1,1,1])

    rowTop = matchInRows[1] 
    rowBottom = matchInRows[3]
    })
  */