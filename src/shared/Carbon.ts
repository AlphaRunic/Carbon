import { Players, ReplicatedStorage } from "@rbxts/services";
import { Network, NetworkType } from "shared/Network";

const Assets: Folder = ReplicatedStorage.WaitForChild("Assets") as Folder;
const Player: Player = Players.LocalPlayer;
const Character: Model = Player.CharacterAdded.Wait()[0];
let UI: PlayerGui;

if (Player)
    UI = Player.WaitForChild("PlayerGui") as PlayerGui;

export type NullishInstance = 
    | Instance
    | undefined;

export type NullishBoolean =
    | boolean
    | undefined;

export type NullishModel = 
    | Model 
    | undefined;

export class Carbon {
    
    public Network: Network;
    public NetworkType: NetworkType;

    public constructor(s: LuaSourceContainer) {
        const networkType: NetworkType = 
            s.ClassName === "Script" ? 
            NetworkType.Server : NetworkType.Client;
        
        this.Network = new Network(networkType);
        this.NetworkType = networkType;
    }
}

export { Assets, Player, Character, UI };