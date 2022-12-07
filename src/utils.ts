import {readFile} from "fs";

export function loadTestData(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        readFile(fileName, 'utf-8', (err, data) => {
            if (err) return reject(err);
            else return resolve(data);
        });
    })
}