The dictionary.c is what I wrote (some information from googling)
The complete speller folder can be downloaded using the command provided in the CS50 pdf file

NOTE: the program is not complete. A segmentation fault is still unsolved. I hope I can come back to it later.
If you know the solution for that, I would be nice if you could give me a comment

detail:
The memory is leaked at line 103 due to not free the allocated variable. However, if I free() it, then the program is not functional anymore
--> more error will occur.