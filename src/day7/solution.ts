import {loadTestData, sumArray} from "../utils";

interface Directory {
    name: string
    topDirectory?: Directory
    directories: Directory[]
    files: File[]
}

interface File {
    name: string
    size: number
}

enum Command {
    CHANGE_DIRECTORY = "cd",
    LIST = "ls"
}

const COMMAND_MARKER = "$"
const TOP_DIR_MARKER = ".."
const DIR_MARKER = "dir"
const PART1_SIZE_THRESHOLD = 100000
const FILESYSTEM_MAX_SIZE = 70000000
const REQUIRED_FS_SPACE = 30000000


/**
 * Find all the directories with a total size of at most 100000. What is the sum of the total sizes of those directories?
 */
function solvePart1(fileSystem: Directory): number {
    let sizeThresholdCounter = 0;
    const directoryAction = (directory: Directory, totalSize: number) => {
        if (totalSize <= PART1_SIZE_THRESHOLD) {
            sizeThresholdCounter += totalSize;
        }
    }

    calculateDirectorySize(fileSystem, directoryAction)

    return sizeThresholdCounter;
}

/**
 * Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?
 */
function solvePart2(fileSystem: Directory): number {
    let minSizeDiff = Number.MAX_VALUE;
    const freeSpace = FILESYSTEM_MAX_SIZE - calculateDirectorySize(fileSystem)
    console.log(`free space ${freeSpace}`)
    const spaceNeeded = REQUIRED_FS_SPACE - freeSpace
    console.log(`space needed ${spaceNeeded}`)

    const directoryAction = (directory: Directory, totalSize: number) => {
        const sizeDiff = totalSize - spaceNeeded

        if (sizeDiff >= 0 && sizeDiff < minSizeDiff) {
            console.log(totalSize)
            minSizeDiff = sizeDiff;
        }
    }

    calculateDirectorySize(fileSystem, directoryAction)


    return spaceNeeded + minSizeDiff;
}


const calculateDirectorySize: (d: Directory, a?: (d: Directory, s: number) => void) => number = (directory, action) => {
    const filesSize = sumArray(directory.files.map((file) => file.size))
    const directoriesSize = sumArray(directory.directories.map((subDir) => calculateDirectorySize(subDir, action)))
    const totalSize = filesSize + directoriesSize

    action && action(directory, totalSize)

    return totalSize
}

function parseFileSystem(rawData: string): Directory {
    const lines: string[] = rawData.split(/\r?\n/)
    lines.shift() // this will remove 'cd /' line, as it's easier to assume it's always there.

    const fileStructure: Directory = {
        name: "/",
        files: [],
        directories: []
    }

    let currentDirectory = fileStructure

    lines.forEach((line) => {
        if (line.startsWith(COMMAND_MARKER)) {
            const [, command, argument] = line.split(" ")

            switch (command) {
                case Command.CHANGE_DIRECTORY:
                    if (argument === TOP_DIR_MARKER) {
                        if (currentDirectory.topDirectory) {
                            currentDirectory = currentDirectory.topDirectory
                        } else {
                            throw "Cant go up, invalid data"
                        }
                    } else {
                        const subDirectory = currentDirectory.directories.find(directory => directory.name === argument)
                        if (subDirectory) {
                            currentDirectory = subDirectory
                        } else throw "Sub directory doesn't exist, invalid data"
                    }
                    break;
                case Command.LIST:
                    break;
            }

        } else {
            if (line.startsWith(DIR_MARKER)) {
                const [, name] = line.split(" ")
                currentDirectory.directories.push({
                    name,
                    files: [],
                    directories: [],
                    topDirectory: currentDirectory
                })
            } else {
                const [size, name] = line.split(" ")

                currentDirectory.files.push({
                    name,
                    size: Number(size),
                })
            }
        }
    })

    return fileStructure
}

loadTestData("src/day7/input")
    .then((data) => {
        const fileSystem = parseFileSystem(data)
        console.log(`Answer to part 1 is ${solvePart1(fileSystem)}`)
        console.log(`Answer to part 2 is ${solvePart2(fileSystem)}`)
    })
