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
    }
  }

  var hashtag = function(){
    var matchInColumns = _.some($scope.board, function(row){
      var leftCol =  _.every($scope.board[1])
      var rightCol =  _.every($scope.board[3])
      if (leftCol && rightCol) {
        console.log("col")
        return true
      }
    })

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

    if (rowTop && rowBottom && matchInColumns) {
      $scope.winner = true
    }
  }

  var outline = function(){
  
//row and column are reversed dude
    var sideCols = _.reduce($scope.board, function(memory, row){
      return _.map(row, function(cell, index){
        if (index === 0){ 
          if (memory[index] === 0 ) {
            return 0
          }
          return cell
        }

       if (index === 4){ 
        if (memory[index] === 0 ) {
            return 0
          }
          return cell
        }        
      })

    }, [1,1,1,1,1])


    var columnLeft = sideCols[0]
    var columnRight = sideCols[4]

    var matchInRows = _.some($scope.board, function(row){
      //makes it the top
      //return row[0]
      //$scope.board makes it the column... for reasons i don't understand
      var leftRow =  _.every($scope.board[0])
      var rightRow =  _.every($scope.board[4])
      if (leftRow && rightRow) {
        return true
      }
    })

    console.log( matchInRows)


    if (columnLeft && columnRight && matchInRows) {
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

})