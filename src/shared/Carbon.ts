import { Players, ReplicatedStorage, Workspace, RunService as Runtime } from "@rbxts/services";
import { Network, NetworkType } from "shared/Network";
import { BaseComponent } from "./Component";

const Camera = Workspace.CurrentCamera as Camera;
const Assets = ReplicatedStorage.Assets;
const Player: Player = Players.LocalPlayer;
let Character: Model;
let UI: PlayerGui;

if (Player) {
    Character = Player.Character || Player.CharacterAdded.Wait()[0];
    UI = Player.WaitForChild("PlayerGui") as PlayerGui;
}

export type NullishInstance = 
    | Instance
    | undefined;

export type NullishModel = 
    | Model 
    | undefined;
    
export type NullishBoolean =
    | boolean
    | undefined;

export type NullishFunction = 
    | Callback
    | undefined
    | null;

export class Carbon {
    public Render: RBXScriptSignal = Runtime.RenderStepped;
    public Stepped: RBXScriptSignal = Runtime.Stepped;
    public Update: RBXScriptSignal = Runtime.Heartbeat;
    public Network: Network;
    public NetworkType: NetworkType;

    public constructor(src: LuaSourceContainer) {
        const networkType: NetworkType = 
            src.ClassName === "Script" ? 
            NetworkType.Server : NetworkType.Client;
        
        this.Network = new Network(networkType);
        this.NetworkType = networkType;
    }

    public RunComponents(componentList: BaseComponent[]) {
        const isClient = Runtime.IsClient()
        componentList.forEach((component: BaseComponent): void => {
            if (component.Start)
                component.Start(component);

            let step: RBXScriptConnection;
            let upd: RBXScriptConnection;

            if (isClient) {
                Runtime.BindToRenderStep(
                    component.Name, 
                    Enum.RenderPriority.Camera.Value, 
                    (dt: number): void => {
                        /*  Compiler fails here. 
                            component.Update(dt) should compile to component:Update(dt). 
                            Alas, it does not.  */
                        if (component.Update)
                            component.Update(component, dt);
                    }
                );

                step = this.Stepped.Connect((time: number, dt: number): void => {
                    if (component.Run)
                        component.Run(component, time, dt);
                });

                if (!component.Update)
                    Runtime.UnbindFromRenderStep(component.Name);
                if (!component.Run)
                    step.Disconnect();
            } else {
                upd = this.Update.Connect((dt: number): void => {
                    if (component.Update)
                        component.Update(component, dt);
                });

                if (!component.Update)
                    upd.Disconnect();
            }
        });
    }
}

export { Assets, Player, Character, UI, Camera };