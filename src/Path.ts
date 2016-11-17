
interface Object {
    rootPath: string
}

export const Path = (value: string) =>
    (target: any) => {
        target.prototype.rootPath = value
    }