Life is a simple cellular automata program
=========================

It has these rules:

    * Cells are either alive or dead,
    * All the cells are laid out on a rectangular grid (which wraps around at the edges),
    * Each cell has 8 neighbors. For example : cell (2,2) has the neighbors : (1,1) (1,2) (1,3) (2,1) (2,3) (3,1) (3,2) (3,3)
    * If a dead cell has exactly 3 living neighbors it becomes alive in the next generation
    * If a living cell has exactly 2 or 3 living neighbors it stays alive in the next generation, otherwise it dies
