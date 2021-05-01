import { ReplicatedStorage, Players } from "@rbxts/services";
import { Exception } from "./classes/Exception";
const Remotes = ReplicatedStorage.WaitForChild("Network");

type Remote = 
    | RemoteEvent
    | RemoteFunction;

export enum NetworkType {
    Client,
    Server
}

export class Network {
    public constructor(
        private networkType: NetworkType
    ) {}

    private GetRemote(remoteName: string): Remote {
        return Remotes.WaitForChild(remoteName) as Remote;
    }

    public Emit(remoteName: string, ...args: unknown[]): unknown[] {
        const remote: Remote = this.GetRemote(remoteName);
        const remoteType: string = remote.ClassName;

        let res: unknown[] = []
        switch(this.networkType) {
            case NetworkType.Client:
            {    
                switch(remoteType) {
                    case "RemoteEvent":
                        (remote as RemoteEvent).FireServer(...args);
                        break;
                    
                    case "RemoteFunction":
                        res = [(remote as RemoteFunction).InvokeServer(...args)];
                        break;
                }
                break;
            }

            case NetworkType.Server:
            {    
                const plr: Player = Players.LocalPlayer;
                switch(remoteType) {
                    case "RemoteEvent":
                        (remote as RemoteEvent).FireClient(plr, ...args);
                        break;
                    
                    case "RemoteFunction":
                        res = [(remote as RemoteFunction).InvokeClient(plr, ...args)];
                        break;
                }
            }
        }

        return res;
    }

    public EmitAll(...args: unknown[]): void {
        const plr: Player = Players.LocalPlayer;
        Remotes.GetChildren()
            .forEach((remote: Instance): void => {
                this.Emit(remote.Name, plr);
            });
    }

    public On(remoteName: string, fn: Callback): void {
        const remote: Remote = this.GetRemote(remoteName);
        const remoteType = remote.ClassName;

        switch(this.networkType) {
            case NetworkType.Client:
                switch(remoteType) {
                    case "RemoteEvent":
                        (remote as RemoteEvent).OnClientEvent.Connect(fn);
                        break;
                    
                    case "RemoteFunction":
                        (remote as RemoteFunction).OnClientInvoke = fn;
                        break;
                }
                break;

            case NetworkType.Server:
                switch(remoteType) {
                    case "RemoteEvent":
                        (remote as RemoteEvent).OnServerEvent.Connect(fn);
                        break;
                    
                    case "RemoteFunction":
                        (remote as RemoteFunction).OnServerInvoke = fn;
                        break;
                }
                break;
        }
    }

    public Once(remoteName: string, fn: Callback): void {
        throw new Exception("Carbon.Network.Once() isn't implemented yet.");
    }
}