import { Exception } from "../Internal/Exception";

export function WaitFor<T extends Instance>(instance: Instance, instanceName: string): T {
    if (!instance) throw new Exception("Instance is undefined");
    if (!instanceName) throw new Exception("Instance name is undefined");
    return instance.WaitForChild(instanceName) as T;
}