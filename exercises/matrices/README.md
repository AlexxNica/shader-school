# Matrices

## Matrix data types

In addition to vectors, GLSL has special datatypes for representing low dimensional matrices.  There are only 3 of these:  `mat2, mat3, mat4` which correspond to a 2x2, 3x3 and 4x4 square matrix respectively:

```glsl
//Create a a 2x2 identity matrix.  Note matrix constructors are in column major order.
mat2 I = mat2(1.0, 0.0,
              0.0, 1.0);

//Equivalently,
mat2 I = mat2(1.0);

//Matrices can also be constructed by giving columns:
vec3 a = vec3(0, 1, 0);
vec3 b = vec3(2, 0, 0);
vec3 c = vec3(0, 0, 4);
mat3 J = mat3(a, b, c);

//Now:
//J = mat3(0, 2, 0,
           1, 0, 0,
           0, 0, 4);
```

The columns of matrices can be accessed using the square brackets.  For example:

```glsl
mat3 m = mat3(1.1, 2.1, 3.1,
              1.2, 2.2, 3.2,
              1.3, 2.3, 3.3);

//Read out first column of m
vec3 a = m[0];

//Now: a = vec3(1.3, 2.3, 3.3);
```

### Matrix arithmetic

Matrices support similar arithmetic operations to vectors.  Both scalar addition and vector addition are defined:

```glsl
mat2 m = mat2(1, 2,
              3, 4);
mat2 w = mat2(7, 8,
              9, 10);

//Component wise addition
mat2 h = m + w;
//Now: h = mat2(8,  10,
                12, 14)

//Scalar multiplication
mat2 j = 2.0 * m;
//Now: j = mat2(2, 4,
                6, 8)
```

The multiplication or `*` operator for matrices does not have the same meaning as for vectors.  Instead of being applied component-wise, it is used to implement matrix multiplication in the linear algebra sense. If you want to do component-wise multiplication, you can use the `matrixCompMult` function:

```glsl
mat2 m = mat2(1, 2,
              3, 4);
mat2 w = mat2(7, 8,
              9, 10);

mat2 q = matrixCompMult(m, w);

//q = mat2( 1, 16,
           27, 40)
```
