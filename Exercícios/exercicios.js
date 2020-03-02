function fibonacciGenerator (n) {
   
    var arr=[]
      numA = 0
      numB = 1
      for(i=2; i<=n; i++){
          arr.push(numA)
          numB+=numA
          numA+=numB
          arr.push(numB)
      }
      arr.length = (n-1)/2
      console.log(arr)
  }
  
  fibonacciGenerator(8)