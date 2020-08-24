function geradorFibonacci(n) {

    var arr = []
    a = 0
    b = 1
    for (i = 0; i < n; i++) {
        arr.push(a)
        var temp = a
        a += b
        b = temp
    }
    console.log(arr)
}

geradorFibonacci(10)