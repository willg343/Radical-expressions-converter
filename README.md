This program is intended to act as a radical converter. It operates with mixed and entire radicals converting them back and forth. The limits and boundaries include:
1.	An infinite amount of single letter variables, same variable with different powers repeatedly used in an expression
2.	Variable powers up to 4*10^9
3.	Infinitely big root indexes
4.	Integer coefficients up to 10^7
5.  Partial handling of negative radicands, unless a negative expression is combined with an even power - in such a case the program outputs a warning.
6.  Any whole numbers may be used, as long as the resulting values are kept in the range -3 * 10^15 to 3 * 10^15 (as further beyond that, JavaScript has rounding issues when performing mathematical operations on the numbers)
