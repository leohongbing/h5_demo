enum e1 {
    A = 1, b, c,
    a
}

enum e2 {
    // constant members
    // None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    // ReadWrite  = Read | Write,
    // computed member
    // G = "123".length
}
console.log(e1, e2)
