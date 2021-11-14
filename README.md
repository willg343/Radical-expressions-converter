This program is intended to act as a simple radical converter. It operates with mixed and entire radicals converting them back and forth. The limits and boundaries include:
1.	An infinite amount of single letter variables, same variable with different powers repeatedly used in an expression
2.	Variable powers up to 4*10^9
3.	Infinitely big root indexes
4.	Integer coefficients up to 10^7
5.	Negative expressions
There are several characteristics to consider when using it:
1.	If a negative expression is combined with an even power, the program will output a warning.
2.	Any whole numbers may be used, as long as the resulting values are kept in the range -3 * 10^15 to 3 * 10^15 (as further beyond that, JavaScript has rounding issues when performing mathematical operations on the numbers)
3.	Variables with a power of 1 don't need the power indicated.
The input format for expressions is the following: coefficient root root-index of radicand keyword keyword Example: 3xy^6z root 5 of 250c^11v^3x^3y^17s^22z^4
Note, that the √ sign is ommitted and replaced with the root-of combination, as √ is hardly accessable on the keyboard for a user, and recording the root index also might be more complicated.

