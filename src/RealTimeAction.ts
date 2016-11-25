

export const RealTimeAction = (realTimePath: string, onUpdate: string, onDelete: string, onStreamUpdate?: Map<string, string>) =>
    (target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) => {
        const previousValue = descriptor.value

        descriptor.value = (...args: Array<any>) => {
            let response = previousValue(...args)
            response.onUpdate = onUpdate
            response.onDelete = onDelete
            response.onStreamUpdate = onStreamUpdate
            response.realTimePath = realTimePath
            return response
        }

    }