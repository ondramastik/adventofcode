import {loadTestData} from "../utils";

interface Tree {
    x: number
    y: number
    height: number
    leftTree?: Tree
    rightTree?: Tree
    topTree?: Tree
    bottomTree?: Tree
}

/**
 * Consider your map; how many trees are visible from outside the grid?
 */
function solvePart1(trees: Tree[]): number {
    const canReachEdge: (tree: Tree, cb: (tree: Tree) => Tree | undefined, h: number) => boolean = (tree, nextTreeExtractor, treeHeight) => {
        const nextTree = nextTreeExtractor(tree)
        if (nextTree) {
            if (treeHeight > nextTree.height) {
                return canReachEdge(nextTree, nextTreeExtractor, treeHeight)
            }
            return false
        } else return true
    }

    const visibleTrees = trees.filter((tree) => {
        return canReachEdge(tree, (t) => t.leftTree, tree.height) ||
            canReachEdge(tree, (t) => t.rightTree, tree.height) ||
            canReachEdge(tree, (t) => t.topTree, tree.height) ||
            canReachEdge(tree, (t) => t.bottomTree, tree.height);
    })

    return visibleTrees.length
}

/**
 * Consider each tree on your map. What is the highest scenic score possible for any tree?
 */
function solvePart2(trees: Tree[]): number {
    const getBlockingTreeDistance: (tree: Tree, cb: (tree: Tree) => Tree | undefined, h: number, c?: number) => number = (tree, nextTreeExtractor, treeHeight, counter = 0) => {
        const nextTree = nextTreeExtractor(tree)
        if (nextTree) {
            counter++;
            if (treeHeight > nextTree.height) {
                return getBlockingTreeDistance(nextTree, nextTreeExtractor, treeHeight, counter)
            } else return counter
        } else return counter
    }

    const scenicScores = trees.map((tree) => {
        return getBlockingTreeDistance(tree, (t) => t.leftTree, tree.height) *
            getBlockingTreeDistance(tree, (t) => t.rightTree, tree.height) *
            getBlockingTreeDistance(tree, (t) => t.topTree, tree.height) *
            getBlockingTreeDistance(tree, (t) => t.bottomTree, tree.height);
    })

    return Math.max(...scenicScores)
}

function parseTestData(rawData: string): Tree[] {
    const lines: string[] = rawData.split(/\r?\n/)
    const grid: Tree[][] = lines.map((line, x) => line.split("")
        .map((character, y) => ({
            x,
            y,
            height: Number(character)
        })))

    for (let i = 0; i < grid.length; i++) {
        for (let y = 0; y < grid[i].length; y++) {
            grid[i][y].rightTree = grid[i][y + 1]
            grid[i][y].leftTree = grid[i][y - 1]
            if (grid[i + 1]) grid[i][y].bottomTree = grid[i + 1][y]
            if (grid[i - 1]) grid[i][y].topTree = grid[i - 1][y]
        }
    }
    return grid.flat()
}

loadTestData("src/day8/input")
    .then((data) => {
        const testData = parseTestData(data)
        console.log(`Answer to part 1 is ${solvePart1(testData)}`)
        console.log(`Answer to part 2 is ${solvePart2(testData)}`)
    })
